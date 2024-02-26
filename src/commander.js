import { Option, program } from 'commander';

program
    .name('gendiff')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format')
    .addHelpOption(new Option('-h, --help', 'output usage information'))

const getHelp = program.parse();  
export default getHelp;