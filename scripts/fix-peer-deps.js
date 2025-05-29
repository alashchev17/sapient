const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../packages');

function getPackageJson(packagePath) {
  try {
    const content = fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

function savePackageJson(packagePath, packageJson) {
  fs.writeFileSync(
    path.join(packagePath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );
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

function fixPackage(packageName) {
  const packagePath = path.join(packagesDir, packageName);
  const packageJson = getPackageJson(packagePath);
  
  if (!packageJson) return;
  
  const declaredPeerDeps = packageJson.peerDependencies || {};
  const requiredPeerDeps = {};
  let hasChanges = false;
  
  // Get all peer deps from internal dependencies
  Object.keys(declaredPeerDeps).forEach(dep => {
    if (dep.startsWith('@sapient/')) {
      const childPeerDeps = getAllPeerDeps(dep);
      Object.assign(requiredPeerDeps, childPeerDeps);
    }
  });
  
  // Add missing peer deps
  Object.keys(requiredPeerDeps).forEach(dep => {
    if (!declaredPeerDeps[dep] && dep !== packageJson.name) {
      declaredPeerDeps[dep] = requiredPeerDeps[dep];
      hasChanges = true;
      console.log(`  Adding ${dep}@${requiredPeerDeps[dep]} to ${packageJson.name}`);
    }
  });
  
  if (hasChanges) {
    packageJson.peerDependencies = declaredPeerDeps;
    
    // Also update devDependencies for internal packages
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
    }
    
    Object.keys(declaredPeerDeps).forEach(dep => {
      if (dep.startsWith('@sapient/') && !packageJson.devDependencies[dep]) {
        packageJson.devDependencies[dep] = declaredPeerDeps[dep];
      }
    });
    
    savePackageJson(packagePath, packageJson);
  }
}

console.log('Fixing peer dependencies...\n');

// Fix all packages
const packages = fs.readdirSync(packagesDir);
packages.forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName);
  if (fs.statSync(packagePath).isDirectory()) {
    fixPackage(packageName);
  }
});

console.log('\nPeer dependencies fixed.');
