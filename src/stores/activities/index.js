import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_ACTIVITIES} from '~/constants/constants';
import {findIndexByKey} from '~/utils/common-helpers/arr-helpers';

export class ActivitiesStore {
  constructor() {
    makeAutoObservable(this);
  }

  activities = DEFAULT_ACTIVITIES;
  setActivities = activities => {
    this.activities = activities;
  };
  removeById = id => {
    const index = findIndexByKey(this.activities, 'id', id);
    if (index < 0) return;
    this.activities = this.activities.filter((_, i) => i !== index);
  };
  setDefaultActivities = () => {
    this.activities = DEFAULT_ACTIVITIES;
  };
}

export const ActivitiesContext = createContext();
export const useActivities = () => useContext(ActivitiesContext);
