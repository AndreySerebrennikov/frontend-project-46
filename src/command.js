import * as path from 'path';
import { readFile } from 'node:fs';
import { cwd } from 'node:process';

const command = (path1, path2) => {
  const paths = [path1, path2];
  return paths.forEach((filepath) => {
    const absolutePath = path.resolve(cwd(), filepath);
    readFile(absolutePath, 'utf-8', (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
    });
  });
};
export default command;
