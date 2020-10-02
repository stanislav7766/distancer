import {hhmmssSum, calcPace} from './timeToSec';

const DEFAULT_MONTH_PROPS = {
  monthTime: '00:00:00',
  monthAvgSpeed: 0,
  monthAvgPace: '',
  monthDistance: 0,
};

export const calcFromMonth = arr => {
  const monthCount = arr.length;
  const {monthTime: trash, ...rest} = arr.reduce((accum, act) => {
    const monthAvgSpeed = accum.monthAvgSpeed + act.avgSpeed / monthCount;
    const monthDistance = act.distance + accum.monthDistance;
    const monthTime = hhmmssSum(accum.monthTime, act.movingTime);
    const monthAvgPace = calcPace(monthDistance, monthTime);
    return {
      monthAvgSpeed,
      monthAvgPace,
      monthDistance,
      monthTime,
    };
  }, DEFAULT_MONTH_PROPS);
  return {monthCount, ...rest};
};
