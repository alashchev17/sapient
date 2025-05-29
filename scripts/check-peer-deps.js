const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../packages');
const errors = [];

function getPackageJson(packagePath) {
  try {
    const content = fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

function getAllPeerDeps(packageName, visited = new Set()) {
  if (visited.has(packageName)) return {};
  visited.add(packageName);
  
  const packagePath = path.join(packagesDir, packageName.replace('@sapient/', 'sapient-'));
  const packageJson = getPackageJson(packagePath);
  
  if (!packageJson || !packageJson.peerDependencies) return {};
  
  const allPeerDeps = { ...packageJson.peerDependencies };
  
  // Recursively get peer deps of peer deps
  Object.keys(packageJson.peerDependencies).forEach(dep => {
    if (dep.startsWith('@sapient/')) {
      const childPeerDeps = getAllPeerDeps(dep, visited);
      Object.assign(allPeerDeps, childPeerDeps);
    }
  });
  
  return allPeerDeps;
}

function checkPackage(packageName) {
  const packagePath = path.join(packagesDir, packageName);
  const packageJson = getPackageJson(packagePath);
  
  if (!packageJson) return;
  
  const declaredPeerDeps = packageJson.peerDependencies || {};
  const requiredPeerDeps = {};
  
  // Get all peer deps from internal dependencies
  Object.keys(declaredPeerDeps).forEach(dep => {
    if (dep.startsWith('@sapient/')) {
      const childPeerDeps = getAllPeerDeps(dep);
      Object.assign(requiredPeerDeps, childPeerDeps);
    }
  });
  
  // Check for missing peer deps
  Object.keys(requiredPeerDeps).forEach(dep => {
    if (!declaredPeerDeps[dep] && dep !== packageJson.name) {
      errors.push({
        package: packageJson.name,
        missing: dep,
        version: requiredPeerDeps[dep],
      });
    }
  });
}

// Check all packages
const packages = fs.readdirSync(packagesDir);
packages.forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName);
  if (fs.statSync(packagePath).isDirectory()) {
    checkPackage(packageName);
  }
});

if (errors.length > 0) {
  console.error('Missing peer dependencies detected:\n');
  errors.forEach(({ package: pkg, missing, version }) => {
    console.error(`  ${pkg} is missing peer dependency: ${missing}@${version}`);
  });
  console.error('\nRun "yarn packages:fix" to fix these issues.');
  process.exit(1);
} else {
  console.log('All peer dependencies are correctly declared.');
}
