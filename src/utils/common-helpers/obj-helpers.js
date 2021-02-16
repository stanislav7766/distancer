export const keyInObj = (obj, key) => key in obj;

export const filterByKey = (key, {[key]: _, ...rest}) => rest;

export const filterByKeys = (keys = [], obj = {}) => keys.reduce((accum, key) => filterByKey(key, accum), obj);
