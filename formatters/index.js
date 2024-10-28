import stilysh from './stilysh.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (data, formatName) => {
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return json(data);
  }
  return stilysh(data);
};
export default getFormatter;
