#!/usr/bin/env node
import { program } from 'commander';
import command from '../src/utils.js';

program
  .name('gendiff')
  .argument('filepath1')
  .argument('filepath2')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const result = command(filepath1, filepath2);
    console.log(result);
  });
program.parse();
