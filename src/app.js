/* eslint-disable no-console */
// write code here

const fs = require('fs');
const path = require('path');

const moveFiles = () => {
  const params = process.argv.slice(2);

  if (params.length < 2) {
    console.error('There are missing arguments');

    return;
  }

  const source = params[0];
  let destination = params[1];

  if (!fs.existsSync(source)) {
    console.error('Source not exist');

    return;
  }

  const isDestDir =
    destination.endsWith('/') ||
    (fs.existsSync(destination) && fs.statSync(destination).isDirectory());

  if (isDestDir) {
    const filename = path.basename(source);

    destination = path.join(destination, filename);
  }

  const targetDir = path.dirname(destination);

  if (!fs.existsSync(targetDir)) {
    console.error('Destination directory does not exist');

    return;
  }

  if (source === destination) {
    return;
  }

  try {
    fs.renameSync(source, destination);
  } catch (err) {
    console.error(err);
  }
};

moveFiles();
