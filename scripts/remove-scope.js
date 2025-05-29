const fs = require('fs');
const path = require('path');
const glob = require('glob');

const OLD_SCOPE = '@sapient/';

function updatePackageJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);
  
  // Update package name
  if (pkg.name && pkg.name.startsWith(OLD_SCOPE)) {
    pkg.name = pkg.name.replace(OLD_SCOPE, '');
  }
  
  // Update dependencies
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (pkg[depType]) {
      Object.keys(pkg[depType]).forEach(dep => {
        if (dep.startsWith(OLD_SCOPE)) {
          const newDep = dep.replace(OLD_SCOPE, '');
          pkg[depType][newDep] = pkg[depType][dep];
          delete pkg[depType][dep];
        }
      });
    }
  });
  
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Updated: ${filePath}`);
}

// Update all package.json files
const packageFiles = glob.sync('**/package.json', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
});

packageFiles.forEach(updatePackageJson);

// Update TypeScript imports
const tsFiles = glob.sync('**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
});

tsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(new RegExp(OLD_SCOPE.replace('/', '\\/'), 'g'), '');
  if (content !== updated) {
    fs.writeFileSync(file, updated);
    console.log(`Updated imports in: ${file}`);
  }
});

console.log('\nScope removal complete! Your packages will now be:');
console.log('- sapient-core');
console.log('- sapient-design-tokens');
console.log('- sapient-theme');
console.log('- sapient-button');
console.log('\nNow run:');
console.log('1. yarn install');
console.log('2. yarn build');
console.log('3. yarn changeset publish');
