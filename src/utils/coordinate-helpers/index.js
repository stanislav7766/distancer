import {isFilledArr} from '~/utils/validation/helpers';

const fromArrToObjCoordinate = ([lat, lng]) => ({0: lat, 1: lng});
const fromObjToArrCoordinate = point => [point['0'], point['1']];

export const mapperCoordsArrToObj = coordinates =>
  isFilledArr(coordinates) ? coordinates.map(fromArrToObjCoordinate) : [];

export const mapperCoordsObjToArr = coordinates =>
  isFilledArr(coordinates) ? coordinates.map(fromObjToArrCoordinate) : [];
