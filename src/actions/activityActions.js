import {removeRoute} from '../utils/removeRoute';
import {writeActivities, readActivities} from '../utils/fs';
import {ERROR_TRY_AGAIN, ERROR_OCCURRED, ACTIVITIES_LIST_EMPTY} from '../constants/constants';
import {isFilledArr} from '../utils/isFilledArr';

export const deleteActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {activityId, activities} = payload;
      const _activities = removeRoute(activities, activityId);
      const written = await writeActivities(_activities);
      resolve({success: written, reason: written ? '' : ERROR_TRY_AGAIN});
    } catch (err) {
      reject(err);
    }
  });

export const getActivities = () =>
  new Promise(async (resolve, reject) => {
    try {
      const activities = await readActivities();
      resolve(
        isFilledArr(activities) ? {success: true, data: {activities}} : {success: false, reason: ACTIVITIES_LIST_EMPTY},
      );
    } catch (err) {
      reject(err);
    }
  });

export const saveActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {activity} = payload;
      const activities = await readActivities();
      const written = await writeActivities(isFilledArr(activities) ? [...activities, activity] : [activity]);
      resolve({success: written, reason: written ? '' : ERROR_OCCURRED});
    } catch (err) {
      reject(err);
    }
  });
