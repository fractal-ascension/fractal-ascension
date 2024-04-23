import fs from 'fs/promises'; // Using promise-based fs module
import path from 'path';

async function updateVersionInEnv() {
  const packageJsonPath = path.resolve('./package.json');
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');
  const { version } = JSON.parse(packageJsonData);

  const filePath = './.env';
  let envContent;
  try {
    envContent = await fs.readFile(filePath, 'utf8');
    // Ensure the file content ends without extra new line
    envContent = envContent.trimEnd() + '\n';
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('.env file not found, creating new one.');
      envContent = '';
    } else {
      throw err;
    }
  }

  const versionRegex = /^VITE_APP_VERSION=.*$/m;
  const newVersionLine = `VITE_APP_VERSION=${version}`;

  if (versionRegex.test(envContent)) {
    // Replace existing version, and ensure we manage new lines correctly
    envContent = envContent.replace(versionRegex, newVersionLine);
  } else {
    // Append new version if not found, add it with a newline in front if the file isn't empty
    envContent += (envContent ? '\n' : '') + newVersionLine;
  }

  // Writing updated content to .env file, ensuring exactly one newline at the end
  await fs.writeFile(filePath, envContent.trimEnd() + '\n');
  console.log(`App version (${version}) was updated in ${filePath}`);
}

updateVersionInEnv().catch(console.error);
