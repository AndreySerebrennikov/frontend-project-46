import stilysh from './stilysh.js';
import plain from './plain.js';

const getFormatter = (data, formatName) => {
  if (formatName === 'plain') {
    return plain(data);
  }
  return stilysh(data);
};
export default getFormatter;
