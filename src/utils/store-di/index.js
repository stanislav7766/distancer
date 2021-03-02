import {DI} from '../simple-di';
import {containers} from '../simple-di/container';

const storesContainer = containers.factory('stores');

export const storesDI = new DI(storesContainer);
