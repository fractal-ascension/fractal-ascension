// Using ESM syntax in update-env.mjs or update-env.js (with "type": "module" in package.json)

import fs from 'fs/promises'; // Using promise-based fs module
import path from 'path';

async function updateVersionInEnv() {
  const packageJsonPath = path.resolve('./package.json');
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  const { version } = JSON.parse(packageJsonData);

  const envVariables = `VITE_APP_VERSION=${version}\n`;
  const filePath = './.env';

  // Writing version to .env file
  await fs.writeFile(filePath, envVariables, { flag: 'a' });
  console.log(`App version (${version}) was written to ${filePath}`);
}

updateVersionInEnv().catch(console.error);
