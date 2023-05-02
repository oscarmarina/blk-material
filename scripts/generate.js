/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import {format} from 'prettier';
import path from 'path';

/**
 * Directory where the token files are located.
 * @type {string}
 */
const tokenDir = './src/styles';

/**
 * Process a token file: import it, format the style tokens, and write them to a CSS file.
 * @param {string} file - The name of the token file.
 */
const processTokenFile = async (file) => {
  /**
   * Full path to the token file.
   * @type {string}
   */
  const fullPath = path.resolve(tokenDir, file);

  // Import the style tokens and prefix from the token file
  const {styleTokens, PREFIX} = await import(fullPath);

  /**
   * Path to the CSS file that will be created.
   * @type {string}
   */
  const filePath = path.join(path.dirname(fullPath), `${PREFIX}-tokens.css`);

  /**
   * The formatted CSS string. This string is formatted with Prettier and then
   * each closing brace is replaced with a closing brace followed by a newline.
   * @type {string}
   */
  const formattedCssString = (await format(styleTokens, {parser: 'css'})).replace(/}/g, '}\n');

  // Write the formatted CSS string to a file
  fs.writeFile(filePath, formattedCssString, (err) => {
    if (err) {
      console.error(`Error writing CSS file: ${err}`);
    } else {
      console.log(`CSS file "${filePath}" created or overwritten successfully!`);
    }
  });
};

// Read the directory and get a list of all the files
fs.readdir(tokenDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  // Filter the list of files to get only the token files
  const tokenFiles = files.filter((file) => file.endsWith('-tokens.js'));

  // Process each token file
  tokenFiles.forEach(processTokenFile);
});
