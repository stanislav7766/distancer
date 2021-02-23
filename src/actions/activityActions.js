import {
  ERROR_NETWORK_FAILED,
  ERROR_OCCURRED,
  ACTIVITIES_LIST_EMPTY,
  ACTIVITIES_BATCH_LIMIT,
  ACTIVITIES_LIST_ENDED,
} from '~/constants/constants';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {isFilledArr} from '~/utils/validation/helpers';
import firestore from '@react-native-firebase/firestore';
import {mapperCoordsArrToObj, mapperCoordsObjToArr} from '~/utils/coordinate-helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';

const getActivitiesColRef = ({userId, directionsMode}) =>
  firestore().collection('activities').doc(directionsMode).collection(userId);

export const deleteActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: ERROR_NETWORK_FAILED});

      const {activityId, userId, directionsMode} = payload;
      await getActivitiesColRef({userId, directionsMode}).doc(activityId).update({
        points1: firestore.FieldValue.delete(),
      });
      await Promise.all([getActivitiesColRef({userId, directionsMode}).doc(activityId).delete()]);
      resolve({success: true});
    } catch (err) {
      reject(err);
    }
  });

const _mapActivityDocs = docs =>
  docs.map(doc => {
    const {points1, ...rest} = doc.data();
    rest.points1 = mapperCoordsObjToArr(points1);
    return rest;
  });

export const getFirstActivities = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {direction, userId} = payload;
      const snaphot = await getActivitiesColRef({directionsMode: direction, userId})
        .orderBy('timestamp', 'desc')
        .limit(ACTIVITIES_BATCH_LIMIT)
        .get();
      const {docs} = snaphot;
      const activities = _mapActivityDocs(docs);
      if (!isFilledArr(activities)) return resolve({success: false, reason: ACTIVITIES_LIST_EMPTY});

      const {timestamp} = getLastItem(activities);
      resolve({success: true, data: {activities, nextKey: timestamp}});
    } catch (err) {
      reject(err);
    }
  });

export const getNextActivities = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {direction, userId, nextKey} = payload;
      const snaphot = await getActivitiesColRef({directionsMode: direction, userId})
        .orderBy('timestamp', 'desc')
        .startAfter(nextKey)
        .limit(ACTIVITIES_BATCH_LIMIT)
        .get();
      const {docs} = snaphot;
      const activities = _mapActivityDocs(docs);
      if (!isFilledArr(activities)) return resolve({success: false, reason: ACTIVITIES_LIST_ENDED});

      const {timestamp} = getLastItem(activities);
      resolve({success: true, data: {activities, nextKey: timestamp}});
    } catch (err) {
      reject(err);
    }
  });

export const saveActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {activity, userId} = payload;
      const {directionsMode, id, points1, ...rest} = activity;

      const written = await getActivitiesColRef({userId, directionsMode})
        .doc(id)
        .set({
          ...rest,
          directionsMode,
          id,
          points1: mapperCoordsArrToObj(points1),
        });
      resolve({success: written, reason: written ? '' : ERROR_OCCURRED});
    } catch (err) {
      reject(err);
    }
  });
