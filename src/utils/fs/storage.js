import {getDefaultSettings, getSettingsPath} from '../listen-settings-helpers';
import {existsItem, getItem, setItem} from './asyncStorage';

export const readSettings = type =>
  new Promise(async (resolve, reject) => {
    try {
      const path = getSettingsPath(type);
      const exists = await existsItem(path);
      if (!exists) {
        const settings = getDefaultSettings(type);
        await setItem(path, settings);
        return resolve(settings);
      }
      const data = await getItem(path);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const writeSettings = (obj, type) =>
  new Promise(async (resolve, reject) => {
    try {
      const path = getSettingsPath(type);
      await setItem(path, obj);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

export const initialLoad = () =>
  Promise.all([
    setItem(getSettingsPath('app'), getDefaultSettings('app')),
    setItem(getSettingsPath('map'), getDefaultSettings('map')),
    setItem(getSettingsPath('activity'), getDefaultSettings('activity')),
    setItem(getSettingsPath('route'), getDefaultSettings('route')),
  ]);
