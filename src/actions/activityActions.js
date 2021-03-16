import {ACTIVITIES_BATCH_LIMIT} from '~/constants/constants';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {isFilledArr} from '~/utils/validation/helpers';
import firestore from '@react-native-firebase/firestore';
import {mapperCoordsArrToObj} from '~/utils/coordinate-helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';
import {filterActivitiesToTotalKeys} from '~/utils/activity-helpers/mapper';
import {getTotalsPerKeys, substractTotalsPerKey, updateTotalsPerKey} from './totalsActions';
import {activityToMonthTotals, mapActivityDocs, mapTimeActivity} from '~/utils/activity-helpers';
import {validateActivity} from '~/utils/validation/validation';
import {getLocaleStore} from '~/stores/locale';
import {getNotFinishedLive} from '~/stores/not-finished-live';

const {papyrusify} = getLocaleStore();
const notFinishedLiveStore = getNotFinishedLive();

const getActivitiesColRef = ({userId, directionsMode}) =>
  firestore().collection('activities').doc(directionsMode).collection(userId);

const _updateTotals = async ({activity, userId, directionsMode, type}) => {
  const {key, monthTotals} = activityToMonthTotals(activity);

  await updateTotalsPerKey({
    payload: {userId, direction: directionsMode, monthTotals, key: type === 'general' ? 'general' : key},
  });
};

const _substractTotals = async ({activity, userId, directionsMode, type}) => {
  const {key, monthTotals} = activityToMonthTotals(activity);

  await substractTotalsPerKey({
    payload: {userId, direction: directionsMode, monthTotals, key: type === 'general' ? 'general' : key},
  });
};

const _getGroupsTotals = async ({activities, userId, direction}) => {
  const totalKeys = filterActivitiesToTotalKeys(activities);
  const {
    data: {groupsTotals},
  } = await getTotalsPerKeys({payload: {userId, direction, totalKeys}});
  return groupsTotals;
};

export const deleteActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {activity, userId} = payload;
      const {directionsMode, id: activityId} = activity;
      await getActivitiesColRef({userId, directionsMode}).doc(activityId).update({
        points1: firestore.FieldValue.delete(),
      });
      await Promise.all([
        getActivitiesColRef({userId, directionsMode}).doc(activityId).delete(),
        _substractTotals({activity, userId, directionsMode, type: 'key'}),
        _substractTotals({activity, userId, directionsMode, type: 'general'}),
      ]);
      resolve({success: true});
    } catch (err) {
      reject(err);
    }
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
      const activities = mapActivityDocs(docs);
      if (!isFilledArr(activities))
        return resolve({success: false, reason: papyrusify('savedMode.message.activitiesListEmpty')});

      const {timestamp} = getLastItem(activities);
      const groupsTotals = await _getGroupsTotals({activities, direction, userId});
      resolve({success: true, data: {activities, nextKey: timestamp, groupsTotals}});
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
      const activities = mapActivityDocs(docs);
      if (!isFilledArr(activities))
        return resolve({success: false, reason: papyrusify('savedMode.message.activitiesListEnded')});

      const {timestamp} = getLastItem(activities);
      const groupsTotals = await _getGroupsTotals({activities, direction, userId});
      resolve({success: true, data: {activities, nextKey: timestamp, groupsTotals}});
    } catch (err) {
      reject(err);
    }
  });

export const saveActivity = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {activity, userId} = payload;
      const {validated} = validateActivity(mapTimeActivity(activity));
      const {directionsMode, id, points1, ...rest} = validated;

      await Promise.all([
        getActivitiesColRef({userId, directionsMode})
          .doc(id)
          .set({
            ...rest,
            directionsMode,
            id,
            points1: mapperCoordsArrToObj(points1),
          }),
        _updateTotals({activity: validated, userId, directionsMode, type: 'key'}),
        _updateTotals({activity: validated, userId, directionsMode, type: 'general'}),
      ]);
      resolve({success: true, reason: ''});
    } catch (err) {
      reject(err);
    }
  });

export const deleteAllActivities = ({userId}) =>
  new Promise(async resolve => {
    const directionsModes = ['walking', 'cycling', 'driving'];
    const promises = directionsModes.map(async directionsMode => {
      const snapshot = await getActivitiesColRef({directionsMode, userId}).get();
      const {docs} = snapshot;
      docs.length > 0 &&
        docs.forEach(doc => {
          const {id} = doc.data();
          getActivitiesColRef({userId, directionsMode}).doc(id).delete();
        });
    });
    await Promise.all(promises);
    resolve(true);
  });

export const checkNotFinishedActivity = ({payload}) =>
  new Promise(resolve => {
    const {userId: id} = payload;
    const {active, userId, activity} = notFinishedLiveStore;

    if (id !== userId || !active) return resolve({success: true, data: {exists: false}});
    return resolve({success: true, data: {exists: true, activity}});
  });
