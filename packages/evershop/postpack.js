const fs = require('fs');
const path = require('path');

try {
  // Get the current version of the package from the nearest package.json file
  const packageJson = require(path.resolve(__dirname, 'package.json'));
  const { version } = packageJson;

  // Validate the pack destination environment variable
  const packDestination = process.env.npm_config_pack_destination;
  if (!packDestination) {
    throw new Error('The environment variable "npm_config_pack_destination" is not defined.');
  }

  // Create a package.json file in the packDestination directory with dependencies on the package itself
  const packageData = {
    name: packageJson.name,
    version,
    dependencies: {
      '@evershop/evershop': `file:./evershop-evershop-${version}.tgz`
    },
    scripts: {
      setup: 'evershop install',
      start: 'evershop start',
      'start:debug': 'evershop start:debug',
      build: 'evershop build',
      dev: 'evershop dev',
      'user:create': 'evershop user:create'
    }
  };

  const packageJsonPath = path.resolve(packDestination, 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));

  console.log(`Successfully created package.json at ${packageJsonPath}`);
} catch (error) {
  console.error('Error during postpack script execution:', error.message);
}
