import { program } from 'commander';

const getCertificate = () => {
  program
    .name('gendiff')
    .arguments('filepath1')
    .arguments('filepath2')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information');
  program.parse();
};

export default getCertificate;
