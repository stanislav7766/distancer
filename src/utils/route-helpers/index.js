import {getDiff} from '~/utils/common-helpers/arr-helpers';
import {randomID} from '~/utils/random-id';
import {isEqualJson} from '~/utils/validation/helpers';
import {fixedNum} from '../common-helpers/num-helpers';
import {calcCrow} from './helps';

export const isPushed = (prevRoute, nextRoute) =>
  nextRoute.length === prevRoute.length + 1 && isEqualJson(prevRoute, nextRoute.slice(0, nextRoute.length - 1));

export const isPopped = (prevRoute, nextRoute) =>
  nextRoute.length + 1 === prevRoute.length && isEqualJson(nextRoute, prevRoute.slice(0, prevRoute.length - 1));

export const isDragged = (prevRoute, nextRoute) =>
  prevRoute.length === nextRoute.length &&
  !isEqualJson(nextRoute, prevRoute) &&
  getDiff(prevRoute, nextRoute).length === 1;

export const isMultiplePushed = (prevRoute, nextRoute) =>
  nextRoute.length > prevRoute.length && isEqualJson(prevRoute, nextRoute.slice(0, prevRoute.length));

export const coordinateWithNewId = coordinate => ({id: randomID(), coordinate});
export const mapperWithNewId = route => route.map(coordinateWithNewId);

export const measureDistance = points => {
  if (points.length <= 1) return 0;

  const distance = points.reduce((accum, point, i) => {
    i < points.length - 1 && (accum += calcCrow(point[0], point[1], points[i + 1][0], points[i + 1][1]));
    return accum;
  }, 0);
  return fixedNum(distance, 2);
};

export const measureDistanceM = points => measureDistance(points) * 1000;
