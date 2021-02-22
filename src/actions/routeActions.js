import {writeRoutes, removeRoute} from '~/utils/fs/storage';
import {
  ROUTES_LIST_ENDED,
  ROUTES_LIST_EMPTY,
  ERROR_OCCURRED,
  ERROR_NETWORK_FAILED,
  ROUTES_BATCH_LIMIT,
} from '~/constants/constants';
import {isFilledArr} from '~/utils/validation/helpers';
import firestore from '@react-native-firebase/firestore';
import {mapperCoordsArrToObj, mapperCoordsObjToArr} from '~/utils/coordinate-helpers';
import {isNetworkAvailable} from '~/utils/network-helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';

const getRoutesColRef = ({userId}) => firestore().collection('routes').doc('users').collection(userId);

export const deleteRoute = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const isConnected = await isNetworkAvailable();
      if (!isConnected) return resolve({success: false, reason: ERROR_NETWORK_FAILED});

      const {routeId, userId} = payload;
      await getRoutesColRef({userId}).doc(routeId).update({
        points: firestore.FieldValue.delete(),
      });
      await Promise.all([getRoutesColRef({userId}).doc(routeId).delete(), removeRoute(userId, routeId)]);
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
      if (!isFilledArr(routes)) return resolve({success: false, reason: ROUTES_LIST_EMPTY});

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
      if (!isFilledArr(routes)) return resolve({success: false, reason: ROUTES_LIST_ENDED});

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
      getRoutesColRef({userId})
        .doc(id)
        .set({
          ...rest,
          id,
          points: mapperCoordsArrToObj(points),
        });
      const written = await writeRoutes(userId, id, route);
      resolve({success: written, reason: written ? '' : ERROR_OCCURRED});
    } catch (err) {
      reject(err);
    }
  });
