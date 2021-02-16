import {filterByKey} from '~/utils/common-helpers/arr-helpers';
import {writeRoutes, readRoutes} from '~/utils/fs/storage';
import {ERROR_TRY_AGAIN, ROUTES_LIST_EMPTY, ERROR_OCCURRED} from '~/constants/constants';
import {isFilledArr} from '~/utils/validation/helpers';

export const deleteRoute = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {routeId, routes} = payload;
      const _routes = filterByKey(routes, 'id', routeId);
      const written = await writeRoutes(_routes);
      resolve({success: written, reason: written ? '' : ERROR_TRY_AGAIN});
    } catch (err) {
      reject(err);
    }
  });

export const getRoutes = () =>
  new Promise(async (resolve, reject) => {
    try {
      const routes = await readRoutes();
      resolve(isFilledArr(routes) ? {success: true, data: {routes}} : {success: false, reason: ROUTES_LIST_EMPTY});
    } catch (err) {
      reject(err);
    }
  });

export const saveRoute = ({payload}) =>
  new Promise(async (resolve, reject) => {
    try {
      const {route} = payload;
      const routes = await readRoutes();
      const written = await writeRoutes(isFilledArr(routes) ? [...routes, route] : [route]);
      resolve({success: written, reason: written ? '' : ERROR_OCCURRED});
    } catch (err) {
      reject(err);
    }
  });
