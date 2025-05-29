const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Change this to your npm username or desired scope
const NEW_SCOPE = '@sapiently'; // Replace with your npm username
const OLD_SCOPE = '@sapient';

function updatePackageJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);

  // Update package name
  if (pkg.name && pkg.name.startsWith(OLD_SCOPE)) {
    pkg.name = pkg.name.replace(OLD_SCOPE, NEW_SCOPE);
  }

  // Update dependencies
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach((depType) => {
    if (pkg[depType]) {
      Object.keys(pkg[depType]).forEach((dep) => {
        if (dep.startsWith(OLD_SCOPE)) {
          const newDep = dep.replace(OLD_SCOPE, NEW_SCOPE);
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
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
});

packageFiles.forEach(updatePackageJson);

// Update TypeScript imports
const tsFiles = glob.sync('**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
});

tsFiles.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(new RegExp(OLD_SCOPE.replace('/', '\\/'), 'g'), NEW_SCOPE);
  if (content !== updated) {
    fs.writeFileSync(file, updated);
    console.log(`Updated imports in: ${file}`);
  }
});

console.log('\nScope update complete! Now run:');
console.log('1. yarn install');
console.log('2. yarn build');
console.log('3. yarn changeset publish');
