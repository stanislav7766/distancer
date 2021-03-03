import {DI} from '../simple-di';
import {containers} from '../simple-di/container';

const localesContainer = containers.factory('locales');

export const localesDI = new DI(localesContainer);
