import {randomID} from './randomID';

const mapMonth = {
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
const isFilledArr = arr => !!(Array.isArray(arr) && arr.length > 0);
const isFilledObj = obj => !!(obj instanceof Object && obj.constructor === Object && Object.keys(obj).length > 0);

const sortByDate = arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date));

const splitByMonth = arr =>
  arr.reduce((acc, activity) => {
    const {date} = activity;
    const d = new Date(date);
    const monthNumber = d.getMonth() + 1;
    const year = d.getFullYear();
    const month = mapMonth[monthNumber];
    return {
      ...acc,
      [year]: isFilledObj(acc[year])
        ? {...acc[year], [month]: isFilledArr(acc[year][month]) ? [...acc[year][month], activity] : [activity]}
        : {[month]: [activity]},
    };
  }, {});

const mapSortedEntries = obj =>
  Object.entries(obj)
    .sort((a, b) => b[0] - a[0])
    .map(arr => [...arr, randomID()]);

export const mapper = arr => {
  if (arr.length === 0) return [];
  const sortedDate = sortByDate(arr);
  const splitted = splitByMonth(sortedDate);
  return mapSortedEntries(splitted);
};
