import yaml from 'js-yaml';

const parse = (content, format) => ((format === '.yml' || format === '.yaml') ? yaml.load(content) : JSON.parse(content));
export default parse;
