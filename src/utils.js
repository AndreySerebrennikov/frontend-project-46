/* eslint-disable no-param-reassign */

import * as path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import parse from './parser.js';

const getData = (filepath) => {
  const format = path.extname(filepath);
  const absolutePath = path.resolve(cwd(), filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  return parse(content, format);
};

const command = (path1, path2) => {
  const dataFile1 = getData(path1);
  const dataFile2 = getData(path2);
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
  return `{\n${result}}`;
};
export default command;
