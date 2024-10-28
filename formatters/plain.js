const stringify = (data) => {
  if (data === null || typeof data === 'boolean') {
    return data;
  }
  if (typeof data === 'object') {
    return '[complex value]';
  }
  return `'${data}'`;
};

const plain = (tree) => {
  const iter = (node, key) => {
    const currentKey = key === '' ? '' : `${key}.`;
    return node.reduce((acc, item) => {
      let string = acc;
      if (item.type === 'added') {
        string += `Property '${currentKey}${item.key}' was added with value: ${stringify(item.value)}\n`;
      }
      if (item.type === 'deleted') {
        string += `Property '${currentKey}${item.key}' was removed\n`;
      }
      if (item.type === 'changed') {
        string += `Property '${currentKey}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}\n`;
      }
      if (item.type === 'nested') {
        const nestedKey = currentKey + item.key;
        string += iter(item.children, nestedKey);
      }
      return string;
    }, '');
  };
  return iter(tree, '').trim();
};
export default plain;
