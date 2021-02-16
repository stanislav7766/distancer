import {isEqualJson, isFilledArr} from '~/utils/validation/helpers';

export const filterByKey = (arrOfObj, key, value) => arrOfObj.filter(obj => obj[key] !== value);
export const filterByIndex = (arr, index) => arr.filter((_, i) => i !== index);

export const findIndexByKey = (arrOfObj, key, value) => arrOfObj.findIndex(obj => obj[key] === value);

export const getDiff = (arr1, arr2) => arr2.filter(val => !arr1.some(val2 => isEqualJson(val, val2)));

export const getIndexSingleDiff = (arr1, arr2) => arr1.findIndex(val => !arr2.some(val2 => isEqualJson(val, val2)));

export const getLastItem = arr => arr.slice(-1)[0];
export const getFirstItem = arr => arr[0];

export const getBounds = arr => (!isFilledArr(arr) ? [] : [getFirstItem(arr), getLastItem(arr)]);
