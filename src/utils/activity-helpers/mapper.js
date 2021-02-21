import {calcFromMonth} from './index';
import {randomID} from '~/utils/random-id';
import {mapMonth} from './helps';
import {isFilledArr, isFilledObj} from '../validation/helpers';

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

const splitByGroups = arr => {
  const groups = [];

  for (let i = 0; i < arr.length; i++) {
    const [year, data] = arr[i];
    const arr1 = Object.keys(data);
    for (let index = 0; index < arr1.length; index++) {
      const month = arr1[index];
      const items = data[month];
      const monthTotals = calcFromMonth(items);
      groups.push({items, year, month, monthTotals, id: randomID()});
    }
  }

  return groups;
};

const mapSortedEntries = obj =>
  Object.entries(obj)
    .sort((a, b) => b[0] - a[0])
    .map(arr => [...arr]);

export const mapper = arr => {
  if (arr.length === 0) return [];
  const splitted = splitByMonth(arr);
  const entries = mapSortedEntries(splitted);
  return splitByGroups(entries);
};
