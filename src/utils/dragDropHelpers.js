export const reorderArray = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, order: index }));
};

export const moveItemBetweenArrays = (
  sourceArray,
  targetArray,
  sourceIndex,
  targetIndex,
  item
) => {
  const newSourceArray = [...sourceArray];
  const newTargetArray = [...targetArray];

  if (sourceIndex !== -1) {
    newSourceArray.splice(sourceIndex, 1);
  }

  newTargetArray.splice(targetIndex, 0, item);

  return {
    source: newSourceArray.map((item, index) => ({ ...item, order: index })),
    target: newTargetArray.map((item, index) => ({ ...item, order: index })),
  };
};

export const findItemIndex = (array, itemId) => {
  return array.findIndex(item => item.id === itemId);
};
