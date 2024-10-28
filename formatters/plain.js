const stringify = (data) => {
  if (data === null || typeof data === 'boolean' || data === 0) {
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
    const result = node.map((item) => {
      if (item.type === 'added') {
        return `Property '${currentKey}${item.key}' was added with value: ${stringify(item.value)}\n`;
      }
      if (item.type === 'deleted') {
        return `Property '${currentKey}${item.key}' was removed\n`;
      }
      if (item.type === 'changed') {
        return `Property '${currentKey}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}\n`;
      }
      if (item.type === 'nested') {
        const nestedKey = currentKey + item.key;
        return iter(item.children, nestedKey);
      }
      return `Unknown item type: ${item.type}!`;
    });
    return result.join('');
  };
  return iter(tree, '').trim();
};
export default plain;
