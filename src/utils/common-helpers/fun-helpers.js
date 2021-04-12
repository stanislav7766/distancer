export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const debounce = (func, waitFor) => {
  let timeout = null;

  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};
