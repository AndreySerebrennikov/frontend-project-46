import { program } from 'commander';
import command from './command.js';

const getCertificate = () => {
  program
    .name('gendiff')
    .argument('filepath1')
    .argument('filepath2')
    .action(command)
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information');
  program.parse();
};

export default getCertificate;
