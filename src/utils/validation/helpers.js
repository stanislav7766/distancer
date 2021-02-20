export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'function' && value.length === 0) ||
  (value instanceof Error && value.message === '');

export const isNumber = text => !isNaN(text) && /^[-]?\d+$/.test(text);

export const isEmail = email => /^[a-z0-9_\.\+-]+@[a-z0-9-]+\.[a-z0-9-\.]+$/.test(email);

export const isLength = (text, {min, max = Number.MAX_SAFE_INTEGER}) => text.length >= min && text.length <= max;

export const isNumLength = (num, {min, max = Number.MAX_SAFE_INTEGER}) => num >= min && num <= max;

export const isEqualJson = (ent1, ent2) => JSON.stringify(ent1) === JSON.stringify(ent2);

export const isFilledArr = arr => Array.isArray(arr) && arr.length > 0;

export const isFilledObj = obj =>
  !!(obj instanceof Object && obj.constructor === Object && Object.keys(obj).length > 0);

export const isExist = value => value !== undefined;
export const isNull = value => value === null;

export const isFunction = f => typeof f === 'function';

export const isEmptyString = str => str.trim().length === 0;

export const isObject = obj => obj instanceof Object && obj.constructor === Object;

export const isAvgSpeed = num => Number.isFinite(num);
export const isAvgPace = pace => typeof pace === 'string' && /^[0-9]{1,3}\'[0-9]{1,3}\"$/.test(pace);
