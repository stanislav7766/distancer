export const makeIterator = array => {
  let nextIndex = 0;
  const resetIndex = () => (nextIndex = 0);
  return {
    next: function () {
      nextIndex >= array.length && resetIndex();
      return nextIndex < array.length ? {value: array[nextIndex++]} : {value: array[nextIndex]};
    },
  };
};
