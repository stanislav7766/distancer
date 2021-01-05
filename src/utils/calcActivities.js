import {hhmmssSum, calcPace} from './timeToSec';

const DEFAULT_MONTH_PROPS = {
  monthTime: '00:00:00',
  monthAvgSpeed: 0,
  monthAvgPace: '',
  monthDistance: 0,
};

const sumNum = (first, second) => +first + +second;

export const calcFromMonth = arr => {
  const monthCount = arr.length;
  const {monthTime: trash, ...rest} = arr.reduce((accum, act) => {
    const monthAvgSpeed = sumNum(accum.monthAvgSpeed, act.avgSpeed / monthCount);
    const monthDistance = sumNum(act.distance, accum.monthDistance);
    const monthTime = hhmmssSum(accum.monthTime, act.movingTime);
    const monthAvgPace = calcPace(monthDistance, monthTime);
    return {
      monthAvgSpeed: +monthAvgSpeed.toFixed(2),
      monthAvgPace,
      monthDistance: +monthDistance.toFixed(2),
      monthTime,
    };
  }, DEFAULT_MONTH_PROPS);
  return {monthCount, ...rest};
};
