import {makeAutoObservable} from 'mobx';
import {DEFAULT_ACTIVITIES} from '~/constants/constants';
import {filterByIndex, findIndexByKey, uniquifyByKey} from '~/utils/common-helpers/arr-helpers';
import {groupsMerger, mapper, removeItemFromGroups, removeItemsFromGroups} from '~/utils/activity-helpers/mapper';
import {storesDI} from '~/utils/store-di';

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
  removeByIds = items => {
    const ids = items.map(({id}) => id);
    this._removeByIdsActivities(ids);
    this._removeByIdsGrouppedActivity(items);
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
  _removeByIdsActivities = ids => {
    for (const id of ids) this._removeByIdActivity(id);
  };
  _removeByIdGrouppedActivity = id => {
    this.grouppedActivities = removeItemFromGroups(this.grouppedActivities, id);
  };
  _removeByIdsGrouppedActivity = items => {
    this.grouppedActivities = removeItemsFromGroups(this.grouppedActivities, items);
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

export const useActivities = () => storesDI.Inject('activitiesStore');
