import {
  hhmmssSum,
  hhmmssToSec,
  mmssTohhmmss,
  paceTommss,
  hhmmssTommss,
  secTohhmmss,
  mmssTopace,
} from '~/utils/time-helpers';
import {filterByKey} from '~/utils/common-helpers/obj-helpers';
import {
  DEFAULT_MONTH_PROPS,
  DEFAULT_PACE,
  DEFAULT_AVG_SPEED,
  dateToYearMonth,
  DEFAULT_MONTH_TOTALS,
  mergeAvgsNums,
  substractAvgsNums,
} from './helps';
import {isAvgPace, isAvgSpeed, isFilledArr} from '../validation/helpers';
import {getFirstItem} from '../common-helpers/arr-helpers';
import {ACTIVITIES_BATCH_LIMIT} from '~/constants/constants';
import {fixedNum, substactNum, sumNum} from '../common-helpers/num-helpers';
import {mapperCoordsObjToArr} from '../coordinate-helpers';

export const calcFromMonth = arr => {
  const monthCount = arr.length;
  const totals = arr.reduce((accum, act, ind) => {
    const monthAvgSpeed = mergeAvgsNums({
      prevCount: ind,
      prevAvg: accum.monthAvgSpeed,
      nextAvg: act.avgSpeed,
      nextCount: 1,
    });
    const monthDistance = sumNum(act.distance, accum.monthDistance);
    const monthTime = hhmmssSum(accum.monthTime, act.movingTime);
    const monthAvgPace = mergeAvgPaces(
      {monthCount: ind, monthAvgPace: accum.monthAvgPace},
      {monthCount: 1, monthAvgPace: act.pace},
    );
    return {
      monthAvgPace: isAvgPace(monthAvgPace) ? monthAvgPace : DEFAULT_MONTH_PROPS.monthAvgPace,
      monthTime,
      monthAvgSpeed: isAvgSpeed(monthAvgSpeed) ? fixedNum(monthAvgSpeed, 2) : DEFAULT_MONTH_PROPS.monthAvgSpeed,
      monthDistance: fixedNum(monthDistance, 2),
    };
  }, DEFAULT_MONTH_PROPS);
  const filteredTotals = filterByKey('monthTime', totals);
  return {monthCount, ...filteredTotals};
};

const mergeAvgPaces = (prev, next) => {
  const hhmmssPrev = mmssTohhmmss(paceTommss(prev.monthAvgPace));
  const hhmmssNext = mmssTohhmmss(paceTommss(next.monthAvgPace));

  const secPrev = hhmmssToSec(hhmmssPrev);
  const secNext = hhmmssToSec(hhmmssNext);
  const sec = mergeAvgsNums({
    prevCount: prev.monthCount,
    prevAvg: secPrev,
    nextAvg: secNext,
    nextCount: next.monthCount,
  });
  return mmssTopace(hhmmssTommss(secTohhmmss(sec)));
};

const substractAvgPaces = (prev, next) => {
  const hhmmssPrev = mmssTohhmmss(paceTommss(prev.monthAvgPace));
  const hhmmssNext = mmssTohhmmss(paceTommss(next.monthAvgPace));

  const secPrev = hhmmssToSec(hhmmssPrev);
  const secNext = hhmmssToSec(hhmmssNext);
  const sec = substractAvgsNums({
    prevCount: prev.monthCount,
    prevAvg: secPrev,
    nextAvg: secNext,
    nextCount: next.monthCount,
  });

  return mmssTopace(hhmmssTommss(secTohhmmss(sec)));
};

export const mergeMonthTotals = (prev = DEFAULT_MONTH_TOTALS, next = DEFAULT_MONTH_TOTALS) => {
  const monthCount = sumNum(prev.monthCount, next.monthCount);
  const monthDistance = sumNum(prev.monthDistance, next.monthDistance);
  const monthAvgSpeed = mergeAvgsNums({
    prevCount: prev.monthCount,
    prevAvg: prev.monthAvgSpeed,
    nextAvg: next.monthAvgSpeed,
    nextCount: next.monthCount,
  });

  const monthAvgPace = mergeAvgPaces(prev, next);
  return {
    monthCount,
    monthDistance: fixedNum(monthDistance, 2),
    monthAvgPace,
    monthAvgSpeed: fixedNum(monthAvgSpeed, 2),
  };
};

export const substractMonthTotals = (prev = DEFAULT_MONTH_TOTALS, next = DEFAULT_MONTH_TOTALS) => {
  const monthCount = substactNum(prev.monthCount, next.monthCount);
  const monthDistance = substactNum(prev.monthDistance, next.monthDistance);
  const monthAvgSpeed = substractAvgsNums({
    prevCount: prev.monthCount,
    prevAvg: prev.monthAvgSpeed,
    nextAvg: next.monthAvgSpeed,
    nextCount: next.monthCount,
  });

  const monthAvgPace = substractAvgPaces(prev, next);
  return {
    monthCount,
    monthDistance: fixedNum(monthDistance, 2),
    monthAvgPace,
    monthAvgSpeed: fixedNum(monthAvgSpeed, 2),
  };
};

export const kmToM = km => km * 1000;

export const calcPace = (dist, time) => {
  const distance = parseFloat(dist);
  if (distance === 0) return DEFAULT_PACE;

  const splitedTime = time.split(':');
  const hrs = splitedTime.length === 3 ? parseFloat(splitedTime[0]) : 0;
  const mins = parseFloat(splitedTime.length === 3 ? splitedTime[1] : splitedTime[0]);
  const secs = parseFloat(splitedTime.length === 3 ? splitedTime[2] : splitedTime[1]);

  const timeElapsed = hrs * 60 * 60 + mins * 60 + secs;
  const paceMins = Math.floor(Math.floor(timeElapsed / distance) / 60);
  const paceSecs = Math.floor(timeElapsed / distance) - paceMins * 60;
  return `${paceMins}'${paceSecs}"`;
};
export const kmPerHourToPace = speed => calcPace(speed, '01:00:00');
export const formatSpeed = currSpeed => fixedNum(3.6 * currSpeed, 1);

export const calcAvgSpeed = (km, hhmmss) => {
  const sec = hhmmssToSec(hhmmss);
  return sec === 0 ? DEFAULT_AVG_SPEED : fixedNum(3.6 * (kmToM(km) / sec), 1);
};

export const countInitialGroupsToRender = groups =>
  !isFilledArr(groups) ? 0 : getFirstItem(groups)?.items?.length < ACTIVITIES_BATCH_LIMIT ? 2 : 1;

export const activityToMonthTotals = activity => {
  const monthTotals = calcFromMonth([activity]);
  const {year, month} = dateToYearMonth(activity.date);
  const key = `${year}-${month}`;
  return {key, monthTotals};
};

export const mapActivityDocs = docs =>
  docs.map(doc => {
    const {points1, ...rest} = doc.data();
    rest.points1 = mapperCoordsObjToArr(points1);
    return rest;
  });
