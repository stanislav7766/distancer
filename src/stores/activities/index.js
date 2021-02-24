import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_ACTIVITIES} from '~/constants/constants';
import {filterByIndex, findIndexByKey, uniquifyByKey} from '~/utils/common-helpers/arr-helpers';
import {groupsMerger, mapper, removeItemFromGroups} from '~/utils/activity-helpers/mapper';

export class ActivitiesStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities = DEFAULT_ACTIVITIES;
  grouppedActivities = DEFAULT_ACTIVITIES;
  nextKey = 0;

  setNextKey = nextKey => {
    this.nextKey = nextKey;
  };
  setActivities = (activities, groupsTotals = {}) => {
    this.activities = activities;
    this._setGrouppedActivities(activities, groupsTotals);
  };
  concatActivities = (activities, groupsTotals) => {
    this.activities = uniquifyByKey([...this.activities, ...activities], 'id');
    this._concatGrouppedActivities(activities, groupsTotals);
  };
  removeById = id => {
    this._removeByIdActivity(id);
    this._removeByIdGrouppedActivity(id);
  };
  _checkNextKey = index => {
    const {timestamp} = this.activities[index];
    if (timestamp !== this.nextKey) return;

    const len = this.activities.length;
    if (len === 1) {
      this.nextKey = 0;
      return;
    }

    index === len - 1
      ? (this.nextKey = this.activities[index - 1].timestamp)
      : (this.nextKey = this.activities[index + 1].timestamp);
  };
  _removeByIdActivity = id => {
    const index = findIndexByKey(this.activities, 'id', id);
    if (index < 0) return;

    this._checkNextKey(index);
    this.activities = filterByIndex(this.activities, index);
  };
  _removeByIdGrouppedActivity = id => {
    this.grouppedActivities = removeItemFromGroups(this.grouppedActivities, id);
  };
  setDefaultActivities = () => {
    this.activities = DEFAULT_ACTIVITIES;
    this.grouppedActivities = DEFAULT_ACTIVITIES;
  };

  _setGrouppedActivities = (activities, groupsTotals = {}) => {
    this.grouppedActivities = mapper(activities, groupsTotals);
  };
  _concatGrouppedActivities = (activities, groupsTotals) => {
    const moreGroups = mapper(activities, groupsTotals);
    this.grouppedActivities = groupsMerger(this.grouppedActivities, moreGroups);
  };
}

export const ActivitiesContext = createContext();
export const useActivities = () => useContext(ActivitiesContext);
