const space = (depth, indent = 0, stepsCount = 4, replacer = ' ') => replacer.repeat((depth * stepsCount) - indent);

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `\n${space(depth + 1)}${key}: ${stringify(value, depth + 1)}`).join('');
  return `{${result}\n${space(depth)}}`;
};

const stilysh = (tree) => {
  const iter = (node, depth) => {
    const spaceCount = depth + 1;
    const result = node.map((item) => {
      const { type } = item;
      if (type === 'deleted') {
        return `${space(spaceCount, 2)}- ${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'added') {
        return `${space(spaceCount, 2)}+ ${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'changed') {
        return `${space(spaceCount, 2)}- ${item.key}: ${stringify(item.value1, spaceCount)}\n${space(spaceCount, 2)}+ ${item.key}: ${stringify(item.value2, spaceCount)}`;
      }
      if (type === 'unchanged') {
        return `${space(spaceCount)}${item.key}: ${stringify(item.value, spaceCount)}`;
      }
      if (type === 'nested') {
        return `${space(spaceCount)}${item.key}: {\n${iter(item.children, spaceCount)}\n${space(spaceCount)}}`;
      }
      return `Unknown item type: '${item.type}'!`;
    });
    return result.join('\n');
  };
  return `{\n${iter(tree, 0)}\n}`;
};
export default stilysh;
