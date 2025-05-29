const fs = require('fs');
const path = require('path');
const glob = require('glob');

// You can change this prefix to whatever you like
const PREFIX = 'my-'; // This would create @andre/my-sapient-core, etc.
const YOUR_SCOPE = '@andre'; // Replace with your npm username
const OLD_PATTERN = /@sapient\//g;
const NEW_PATTERN = `${YOUR_SCOPE}/${PREFIX}sapient-`;

function updatePackageJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);
  
  // Update package name
  if (pkg.name && pkg.name.startsWith('@sapient/')) {
    pkg.name = pkg.name.replace(OLD_PATTERN, NEW_PATTERN);
  }
  
  // Update dependencies
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
    if (pkg[depType]) {
      const newDeps = {};
      Object.keys(pkg[depType]).forEach(dep => {
        if (dep.startsWith('@sapient/')) {
          const newDep = dep.replace(OLD_PATTERN, NEW_PATTERN);
          newDeps[newDep] = pkg[depType][dep];
        } else {
          newDeps[dep] = pkg[depType][dep];
        }
      });
      pkg[depType] = newDeps;
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
  const updated = content.replace(OLD_PATTERN, NEW_PATTERN);
  if (content !== updated) {
    fs.writeFileSync(file, updated);
    console.log(`Updated imports in: ${file}`);
  }
});

console.log(`\nPackages renamed! Your packages will now be under ${YOUR_SCOPE}:`);
console.log(`- ${YOUR_SCOPE}/${PREFIX}sapient-core`);
console.log(`- ${YOUR_SCOPE}/${PREFIX}sapient-design-tokens`);
console.log(`- ${YOUR_SCOPE}/${PREFIX}sapient-theme`);
console.log(`- ${YOUR_SCOPE}/${PREFIX}sapient-button`);
console.log('\nNow run:');
console.log('1. yarn install');
console.log('2. yarn build');
console.log('3. yarn changeset publish');
