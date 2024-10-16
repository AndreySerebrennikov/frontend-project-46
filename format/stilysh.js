const space = (depth, indent = 0, stepsCount = 4, replacer = ' ') => replacer.repeat((depth * stepsCount) - indent);

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const entries = Object.entries(data);
  return `{\n${entries.reduce((acc, item) => {
    const [key, value] = item;
    let string = acc;
    string += `${space(depth + 1)}${key}: ${stringify(value, depth + 1)}\n`;
    return string;
  }, '')}${space(depth)}}`;
};

const stilysh = (tree) => {
  const iter = (node, depth) => {
    const spaceCount = depth + 1;
    return node.reduce((acc, item) => {
      const { type } = item;
      let string = acc;
      if (type === 'deleted') {
        string += `${space(spaceCount, 2)}- ${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'added') {
        string += `${space(spaceCount, 2)}+ ${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'changed') {
        string += `${space(spaceCount, 2)}- ${item.key}: ${stringify(item.value1, spaceCount)}\n${space(spaceCount, 2)}+ ${item.key}: ${stringify(item.value2, spaceCount)}`;
      }
      if (type === 'unchanged') {
        string += `${space(spaceCount)}${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'nested') {
        string += `${space(spaceCount)}${item.key}: {\n${iter(item.children, spaceCount)}${space(spaceCount)}}`;
      }
      return `${string}\n`;
    }, '');
  };
  return `{\n${iter(tree, 0)}}`;
};
export default stilysh;
