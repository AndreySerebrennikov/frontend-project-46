#!/usr/bin/env node
import { program } from 'commander';
import command from '../src/utils.js';

program
  .name('gendiff')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    const result = command(filepath1, filepath2, options.format);
    console.log(result);
  });
program.parse();
