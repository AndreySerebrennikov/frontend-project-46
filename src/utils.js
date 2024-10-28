import * as path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import parse from './parser.js';
import getFormatter from '../formatters/index.js';

export const getData = (filepath) => {
  const format = path.extname(filepath);
  const absolutePath = path.resolve(cwd(), filepath);
  const content = readFileSync(absolutePath, 'utf-8');
  return parse(content, format);
};

const getGenDiff = (file1, file2) => {
  const keys = [...new Set(Object.keys(file1).concat(Object.keys(file2)))].sort();
  return keys.map((key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
        return { key: `${key}`, type: 'nested', children: getGenDiff(file1[key], file2[key]) };
      }
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      return { key: `${key}`, type: 'added', value: file2[key] };
    }
    if (Object.hasOwn(file1, key) && (!Object.hasOwn(file2, key))) {
      return { key: `${key}`, type: 'deleted', value: file1[key] };
    }
    if ((Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) && (file1[key] !== file2[key])) {
      return {
        key: `${key}`, type: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    return { key: `${key}`, type: 'unchanged', value: file1[key] };
  });
};
const command = (path1, path2, formatName = 'stilysh') => getFormatter((getGenDiff(getData(path1), getData(path2))), formatName);
export default command;
