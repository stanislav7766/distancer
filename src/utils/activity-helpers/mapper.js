import {calcFromMonth} from './index';
import {randomID} from '~/utils/random-id';
import {dateToYearMonth, findGroupIndex, isExistGroup} from './helps';
import {isExist, isFilledArr, isFilledObj} from '../validation/helpers';
import {filterByIndex, findIndexByKey, isExistObjByKey, uniquifyByKey} from '../common-helpers/arr-helpers';

const splitByMonth = arr =>
  arr.reduce((acc, activity) => {
    const {date} = activity;
    const {year, month} = dateToYearMonth(date);
    return {
      ...acc,
      [year]: isFilledObj(acc[year])
        ? {...acc[year], [month]: isFilledArr(acc[year][month]) ? [...acc[year][month], activity] : [activity]}
        : {[month]: [activity]},
    };
  }, {});

const splitByGroups = (arr, groupsTotals = {}) => {
  const groups = [];

  for (let i = 0; i < arr.length; i++) {
    const [year, data] = arr[i];
    const arr1 = Object.keys(data);
    for (let index = 0; index < arr1.length; index++) {
      const month = arr1[index];
      const items = data[month];

      const key = `${year}-${month}`;
      const groupTotals = groupsTotals[key];
      const monthTotals = isExist(groupTotals) ? groupTotals : calcFromMonth(items);
      groups.push({items, year, month, monthTotals, id: randomID()});
    }
  }

  return groups;
};

const mapSortedEntries = obj =>
  Object.entries(obj)
    .sort((a, b) => b[0] - a[0])
    .map(arr => [...arr]);

export const mapper = (arr, groupsTotals = {}) => {
  if (arr.length === 0) return [];
  const splitted = splitByMonth(arr);
  const entries = mapSortedEntries(splitted);
  return splitByGroups(entries, groupsTotals);
};

export const groupsMerger = (oldGroups, newGroups) => {
  newGroups.forEach(group => {
    const {year, month} = group;
    if (!isExistGroup({year, month, items: oldGroups})) {
      oldGroups.push(group);
      return;
    }
    const index = findGroupIndex({year, month, items: oldGroups});
    if (index < 0) return;

    const oldGroup = oldGroups[index];
    oldGroup.items = uniquifyByKey([...oldGroup.items, ...group.items], 'id');
    oldGroups[index] = oldGroup;
  });

  return oldGroups;
};

export const removeItemFromGroups = (groups, id) =>
  groups.reduce((accum, group) => {
    const {items} = group;

    const itemExists = isExistObjByKey(items, 'id', id);
    if (!itemExists) return [...accum, group];

    const itemInd = findIndexByKey(items, 'id', id);
    if (itemInd < 0) return [...accum, group];
    if (group.items.length === 1) return accum;

    const filteredItems = filterByIndex(group.items, itemInd);

    group.items = filteredItems;
    group.monthTotals = calcFromMonth(filteredItems);
    return [...accum, group];
  }, []);

export const filterActivitiesToTotalKeys = activities => {
  const keys = activities.map(activity => {
    const {date} = activity;
    const {year, month} = dateToYearMonth(date);
    return {id: `${year}-${month}`};
  });
  return uniquifyByKey(keys, 'id');
};
