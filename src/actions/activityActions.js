import {writeActivity, removeActivity, readActivities} from '~/utils/fs/storage';
import {ERROR_NETWORK_FAILED, ERROR_OCCURRED, ACTIVITIES_LIST_EMPTY} from '~/constants/constants';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {isFilledArr} from '~/utils/validation/helpers';
import firestore from '@react-native-firebase/firestore';
import {mapperCoordsArrToObj, mapperCoordsObjToArr} from '~/utils/coordinate-helpers';

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
      await Promise.all([
        getActivitiesColRef({userId, directionsMode}).doc(activityId).delete(),
        removeActivity(directionsMode, userId, activityId),
      ]);
      resolve({success: true});
    } catch (err) {
      reject(err);
    }
  });

export const getActivities = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {direction, userId} = payload;
      const snaphot = await getActivitiesColRef({directionsMode: direction, userId}).get();
      const {docs} = snaphot;
      const activities =
        docs.length > 0
          ? docs.map(doc => {
              const {points1, ...rest} = doc.data();
              rest.points1 = mapperCoordsObjToArr(points1);
              return rest;
            })
          : await readActivities(direction, userId);
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
      const {activity, userId} = payload;
      const {directionsMode, id, points1, ...rest} = activity;
      getActivitiesColRef({userId, directionsMode})
        .doc(id)
        .set({
          ...rest,
          directionsMode,
          id,
          points1: mapperCoordsArrToObj(points1),
        });
      const written = await writeActivity(directionsMode, userId, id, activity);
      resolve({success: written, reason: written ? '' : ERROR_OCCURRED});
    } catch (err) {
      reject(err);
    }
  });
