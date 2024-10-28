import path from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import command from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const resultExpected = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', formatName: 'stilysh', expected: 'expectedJson.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', formatName: 'stilysh', expected: 'expectedJson.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', formatName: 'plain', expected: 'expectedPlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatName: 'plain', expected: 'expectedPlain.txt',
  },
])('command', ({
  file1, file2, formatName, expected,
}) => {
  expect(command(getFixturePath(file1), getFixturePath(file2), formatName))
    .toBe(resultExpected(expected));
});
