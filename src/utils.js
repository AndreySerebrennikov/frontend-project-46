/* eslint-disable no-param-reassign */

import * as path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
};

const command = (path1, path2) => {
  const dataFile1 = JSON.parse(getData(path1));
  const dataFile2 = JSON.parse(getData(path2));
  const keys = [...new Set(Object.keys(dataFile1).concat(Object.keys(dataFile2)))].sort();
  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(dataFile2, key) && dataFile1[key] === dataFile2[key]) {
      acc += `    ${key}: ${dataFile1[key]}\n`;
    }
    if (Object.hasOwn(dataFile1, key) && dataFile1[key] !== dataFile2[key]) {
      acc += `  - ${key}: ${dataFile1[key]}\n`;
    }
    if (Object.hasOwn(dataFile2, key) && dataFile1[key] !== dataFile2[key]) {
      acc += `  + ${key}: ${dataFile2[key]}\n`;
    }
    return acc;
  }, '');
  console.log(`{\n${result}}`);
};
export default command;
