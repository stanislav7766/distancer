import {divNum, mulNum, substactNum, sumNum} from '../common-helpers/num-helpers';
import {isNum} from '../validation/helpers';

export const DEFAULT_MONTH_TOTALS = {
  monthAvgSpeed: 0,
  monthAvgPace: '0\'0"',
  monthDistance: 0,
  monthCount: 0,
  monthAvgSec: 0,
};

export const DEFAULT_PACE = '0\'0"';
export const DEFAULT_AVG_SPEED = 0.0;

export const mapMonth = {
  1: 'jan',
  2: 'feb',
  3: 'mar',
  4: 'apr',
  5: 'may',
  6: 'jun',
  7: 'jul',
  8: 'aug',
  9: 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec',
};

export const sortByDate = arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date));
export const sortByTimestamp = arr => arr.sort((a, b) => b.timestamp - a.timestamp);
export const isExistGroup = ({year, month, items}) => items.some(item => item.year === year && item.month === month);
export const findGroupIndex = ({year, month, items}) =>
  items.findIndex(item => item.year === year && item.month === month);

export const dateToYearMonth = date => {
  const d = new Date(date);
  const monthNumber = d.getMonth() + 1;
  const year = d.getFullYear();
  const month = mapMonth[monthNumber];
  return {year, month};
};

export const mergeAvgsNums = ({prevAvg, prevCount, nextAvg, nextCount}) =>
  divNum(sumNum(mulNum(prevAvg, prevCount), nextAvg), sumNum(prevCount, nextCount));

export const substractAvgsNums = ({prevAvg, prevCount, nextAvg, nextCount}) =>
  divNum(substactNum(mulNum(prevAvg, prevCount), nextAvg), substactNum(prevCount, nextCount));

export const monthTotalOrDefault = (res, defaultVaulue = 0) =>
  isNum(res) && res >= defaultVaulue ? res : defaultVaulue;
