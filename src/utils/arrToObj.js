import {isFilledArr} from './isFilledArr';
export const arrsToObjsCoords = arr => (isFilledArr(arr) ? arr.map(([lat, lng]) => ({0: lat, 1: lng})) : []);

export const objsToArrsCoords = arr => (isFilledArr(arr) ? arr.map(point => [point['0'], point['1']]) : []);
