import {ROUTES_BATCH_LIMIT} from '~/constants/constants';
import {isFilledArr} from '~/utils/validation/helpers';
import firestore from '@react-native-firebase/firestore';
import {mapperCoordsArrToObj, mapperCoordsObjToArr} from '~/utils/coordinate-helpers';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';
import {getLocaleStore} from '~/stores/locale';
import {getNotFinishedRoute} from '~/stores/not-finished-route';

const {papyrusify} = getLocaleStore();
const notFinishedRouteStore = getNotFinishedRoute();

const getRoutesColRef = ({userId}) => firestore().collection('routes').doc('users').collection(userId);

export const deleteRoute = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {routeId, userId} = payload;
      await getRoutesColRef({userId}).doc(routeId).update({
        points: firestore.FieldValue.delete(),
      });
      await Promise.all([getRoutesColRef({userId}).doc(routeId).delete()]);
      resolve({success: true});
    } catch (err) {
      reject(err);
    }
  });

export const deleteMultipleRoutes = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: papyrusify('common.message.errorNetworkFailed')});

      const {routes, userId} = payload;
      if (!isFilledArr(routes))
        return resolve({success: false, reason: papyrusify('savedMode.message.selectedRoutesEmpty')});

      for await (const {id} of routes) {
        await getRoutesColRef({userId}).doc(id).update({
          points: firestore.FieldValue.delete(),
        });
        await getRoutesColRef({userId}).doc(id).delete();
      }

      resolve({success: true});
    } catch (err) {
      reject(err);
    }
  });

const _mapRouteDocs = docs =>
  docs.map(doc => {
    const {points, ...rest} = doc.data();
    rest.points = mapperCoordsObjToArr(points);
    return rest;
  });

export const getFirstRoutes = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {userId} = payload;

      const snaphot = await getRoutesColRef({userId}).orderBy('timestamp', 'desc').limit(ROUTES_BATCH_LIMIT).get();
      const {docs} = snaphot;
      const routes = _mapRouteDocs(docs);
      if (!isFilledArr(routes))
        return resolve({success: false, reason: papyrusify('savedMode.message.routesListEmpty')});

      const {timestamp} = getLastItem(routes);

      resolve({success: true, data: {routes, nextKey: timestamp}});
    } catch (err) {
      reject(err);
    }
  });

export const getNextRoutes = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {userId, nextKey} = payload;

      const snaphot = await getRoutesColRef({userId})
        .orderBy('timestamp', 'desc')
        .startAfter(nextKey)
        .limit(ROUTES_BATCH_LIMIT)
        .get();

      const {docs} = snaphot;
      const routes = _mapRouteDocs(docs);
      if (!isFilledArr(routes))
        return resolve({success: false, reason: papyrusify('savedMode.message.routesListEnded')});

      const {timestamp} = getLastItem(routes);

      resolve({success: true, data: {routes, nextKey: timestamp}});
    } catch (err) {
      reject(err);
    }
  });

export const saveRoute = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {route, userId} = payload;
      const {id, points, ...rest} = route;
      await getRoutesColRef({userId})
        .doc(id)
        .set({
          ...rest,
          id,
          points: mapperCoordsArrToObj(points),
        });
      resolve({success: true, reason: ''});
    } catch (err) {
      reject(err);
    }
  });

export const deleteAllRoutes = ({userId}) =>
  new Promise(async resolve => {
    const snapshot = await getRoutesColRef({userId}).get();
    const {docs} = snapshot;
    docs.length > 0 &&
      docs.forEach(doc => {
        const {id} = doc.data();
        getRoutesColRef({userId}).doc(id).delete();
      });

    resolve(true);
  });

export const checkNotFinishedRoute = ({payload}) =>
  new Promise(resolve => {
    const {userId: id} = payload;
    const {active, userId, route} = notFinishedRouteStore;

    if (id !== userId || !active) return resolve({success: true, data: {exists: false}});
    return resolve({success: true, data: {exists: true, route}});
  });
