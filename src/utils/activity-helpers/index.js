import {hhmmssSum, hhmmssToSec} from '~/utils/time-helpers';
import {filterByKey} from '~/utils/common-helpers/obj-helpers';
import {DEFAULT_MONTH_PROPS, DEFAULT_PACE, DEFAULT_AVG_SPEED, sumNum} from './helps';
import {isAvgPace, isAvgSpeed, isFilledArr} from '../validation/helpers';
import {getFirstItem} from '../common-helpers/arr-helpers';
import {ACTIVITIES_BATCH_LIMIT} from '~/constants/constants';

export const calcFromMonth = arr => {
  const monthCount = arr.length;
  const totals = arr.reduce((accum, act) => {
    const monthAvgSpeed = sumNum(accum.monthAvgSpeed, act.avgSpeed / monthCount);
    const monthDistance = sumNum(act.distance, accum.monthDistance);
    const monthTime = hhmmssSum(accum.monthTime, act.movingTime);
    const monthAvgPace = calcPace(monthDistance, monthTime);
    return {
      monthAvgPace: isAvgPace(monthAvgPace) ? monthAvgPace : DEFAULT_MONTH_PROPS.monthAvgPace,
      monthTime,
      monthAvgSpeed: isAvgSpeed(monthAvgSpeed) ? +monthAvgSpeed.toFixed(2) : DEFAULT_MONTH_PROPS.monthAvgSpeed,
      monthDistance: +monthDistance.toFixed(2),
    };
  }, DEFAULT_MONTH_PROPS);
  const filteredTotals = filterByKey('monthTime', totals);
  return {monthCount, ...filteredTotals};
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
export const formatSpeed = currSpeed => +(3.6 * currSpeed).toFixed(1);

export const calcAvgSpeed = (km, hhmmss) => {
  const sec = hhmmssToSec(hhmmss);
  return sec === 0 ? DEFAULT_AVG_SPEED : +(3.6 * (kmToM(km) / sec)).toFixed(1);
};

export const countInitialGroupsToRender = groups =>
  !isFilledArr(groups) ? 0 : getFirstItem(groups)?.items?.length < ACTIVITIES_BATCH_LIMIT ? 2 : 1;
