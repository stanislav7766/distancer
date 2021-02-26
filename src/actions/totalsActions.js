import firestore from '@react-native-firebase/firestore';
import {calcFromMonth, mapActivityDocs, mergeMonthTotals, substractMonthTotals} from '~/utils/activity-helpers';
import {DEFAULT_MONTH_TOTALS} from '~/utils/activity-helpers/helps';
import {filterByKey} from '~/utils/common-helpers/obj-helpers';
import {isEqualObjJson, isFilledArr, isFilledObj} from '~/utils/validation/helpers';

const getTotalsColRef = ({userId, directionsMode}) =>
  firestore().collection('totals').doc(directionsMode).collection(userId);

const getActivitiesColRef = ({userId, directionsMode}) =>
  firestore().collection('activities').doc(directionsMode).collection(userId);

const _isExistTotalsDocPerKey = async ({userId, direction, key}) => {
  const snaphot = await getTotalsColRef({directionsMode: direction, userId}).doc(key).get();
  return snaphot.exists;
};

const _getTotalsPerKey = ({userId, direction, key}) =>
  new Promise(async resolve => {
    try {
      const exists = await _isExistTotalsDocPerKey({userId, direction, key});
      if (!exists) return resolve({success: false, data: {}});

      const doc = await getTotalsColRef({directionsMode: direction, userId}).doc(key).get();

      resolve({success: true, data: {totals: doc.data()}});
    } catch (err) {
      resolve({success: false, data: {}});
    }
  });

const _setTotalsPerKey = ({userId, direction, key, value}) =>
  new Promise(async resolve => {
    try {
      await getTotalsColRef({directionsMode: direction, userId})
        .doc(key)
        .set({
          ...value,
          id: key,
        });
      resolve({success: true, reason: ''});
    } catch (err) {
      resolve({success: false, reason: err.message});
    }
  });

export const getTotalsPerKeys = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {direction, userId, totalKeys} = payload;
      const accum = {};

      for await (const {id} of totalKeys) {
        const {success, data} = await _getTotalsPerKey({direction, userId, key: id});
        if (success) accum[id] = data.totals;
      }
      resolve({success: true, data: {groupsTotals: accum}});
    } catch (err) {
      reject(err);
    }
  });

export const calcGeneralTotals = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {direction, userId} = payload;
      const snaphot = await getActivitiesColRef({directionsMode: direction, userId}).orderBy('timestamp', 'desc').get();
      const {docs} = snaphot;
      const activities = mapActivityDocs(docs);
      if (!isFilledArr(activities)) return resolve({success: true, data: {generalTotals: DEFAULT_MONTH_TOTALS}});
      const generalTotals = calcFromMonth(activities);
      resolve({success: true, data: {generalTotals}});
    } catch (err) {
      reject(err);
    }
  });

export const updateTotalsPerKey = ({payload}) =>
  new Promise(async resolve => {
    try {
      const {direction, userId, monthTotals, key} = payload;
      const exists = await _isExistTotalsDocPerKey({direction, userId, key});
      if (!exists) {
        await _setTotalsPerKey({direction, userId, key, value: monthTotals});
        return resolve({success: true});
      }
      const doc = await getTotalsColRef({directionsMode: direction, userId}).doc(key).get();
      const prevTotals = doc.data();

      if (!isFilledObj(prevTotals)) {
        await _setTotalsPerKey({direction, userId, key, value: monthTotals});
        return resolve({success: true});
      }

      const totals = mergeMonthTotals(prevTotals, monthTotals);
      await _setTotalsPerKey({userId, direction, key, value: totals});

      resolve({success: true});
    } catch (err) {
      resolve({success: false, reason: err.message});
    }
  });

export const getGeneralTotals = ({payload}) =>
  new Promise(async resolve => {
    try {
      const {direction, userId} = payload;

      const key = 'general';
      const exists = await _isExistTotalsDocPerKey({userId, direction, key});
      if (!exists) {
        await _setTotalsPerKey({direction, userId, key, value: DEFAULT_MONTH_TOTALS});
        return resolve({success: true, data: {generalTotals: DEFAULT_MONTH_TOTALS}});
      }

      const doc = await getTotalsColRef({directionsMode: direction, userId}).doc(key).get();
      const generalTotals = doc.data();

      if (!isFilledObj(generalTotals)) {
        await _setTotalsPerKey({direction, userId, key, value: DEFAULT_MONTH_TOTALS});
        return resolve({success: true, data: {generalTotals: DEFAULT_MONTH_TOTALS}});
      }
      resolve({success: true, data: {generalTotals}});
    } catch (err) {
      resolve({success: false, data: {}});
    }
  });

export const substractTotalsPerKey = ({payload}) =>
  new Promise(async resolve => {
    try {
      const {direction, userId, monthTotals, key} = payload;
      const exists = await _isExistTotalsDocPerKey({direction, userId, key});
      if (!exists) return resolve({success: true});

      const doc = await getTotalsColRef({directionsMode: direction, userId}).doc(key).get();
      const prevTotals = doc.data();

      if (!isFilledObj(prevTotals)) return resolve({success: true});
      if (isEqualObjJson(filterByKey('id', prevTotals), DEFAULT_MONTH_TOTALS)) return resolve({success: true});

      if (prevTotals?.monthCount === 1) {
        await _setTotalsPerKey({direction, userId, key, value: DEFAULT_MONTH_TOTALS});
        return resolve({success: true});
      }

      const totals = substractMonthTotals(prevTotals, monthTotals);
      await _setTotalsPerKey({userId, direction, key, value: totals});

      resolve({success: true});
    } catch (err) {
      resolve({success: false, reason: err.message});
    }
  });

export const deleteAllTotals = ({userId}) =>
  new Promise(async resolve => {
    const directionsModes = ['walking', 'cycling', 'driving'];
    const promises = directionsModes.map(async directionsMode => {
      const snapshot = await getTotalsColRef({directionsMode, userId}).get();
      const {docs} = snapshot;
      docs.length > 0 &&
        docs.forEach(doc => {
          const {id} = doc.data();
          getTotalsColRef({userId, directionsMode}).doc(id).delete();
        });
    });
    await Promise.all(promises);
    resolve(true);
  });
