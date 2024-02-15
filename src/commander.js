import { Option, program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .addHelpOption(new Option('-h, --help', 'output usage information'))

const getHelp = program.parse();  
export default getHelp;