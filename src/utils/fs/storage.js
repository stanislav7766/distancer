import RNFS from 'react-native-fs';
import {
  DEFAULT_ACTIVITY_SETTINGS,
  DEFAULT_APP_SETTINGS,
  DEFAULT_MAP_SETTINGS,
  DEFAULT_ROUTE_SETTINGS,
} from '~/constants/constants';

const EXT_JSON = '.json';
const ENCODING = 'utf8';

const APP_SETTINGS_PATH = `${RNFS.DocumentDirectoryPath}/app_settings${EXT_JSON}`;
const MAP_SETTINGS_PATH = `${RNFS.DocumentDirectoryPath}/map_settings${EXT_JSON}`;
const ACTIVITY_SETTINGS_PATH = `${RNFS.DocumentDirectoryPath}/activity_settings${EXT_JSON}`;
const ROUTE_SETTINGS_PATH = `${RNFS.DocumentDirectoryPath}/route_settings${EXT_JSON}`;

const ROUTES_PATH = `${RNFS.DocumentDirectoryPath}/routes`;

const ACTIVITIES_WALKING_PATH = `${RNFS.DocumentDirectoryPath}/activities/walking`;
const ACTIVITIES_CYCLING_PATH = `${RNFS.DocumentDirectoryPath}/activities/cycling`;
const ACTIVITIES_DRIVING_PATH = `${RNFS.DocumentDirectoryPath}/activities/driving`;

const getSettingsPath = type =>
  ({
    map: MAP_SETTINGS_PATH,
    app: APP_SETTINGS_PATH,
    activity: ACTIVITY_SETTINGS_PATH,
    route: ROUTE_SETTINGS_PATH,
  }[type]);

const getDirectionPath = mode =>
  ({
    walking: ACTIVITIES_WALKING_PATH,
    cycling: ACTIVITIES_CYCLING_PATH,
    driving: ACTIVITIES_DRIVING_PATH,
  }[mode]);

const _deleteFile = filePath =>
  new Promise((resolve, reject) => {
    _exists(filePath)
      .then(res => {
        res
          ? RNFS.unlink(filePath)
              .then(_ => resolve(true))
              .catch(_ => reject(false))
          : resolve(true);
      })
      .catch(_ => reject(false));
  });

const _exists = path =>
  new Promise((resolve, reject) => {
    RNFS.exists(path)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

const _writeFile = (filePath, data) =>
  new Promise((resolve, reject) => {
    RNFS.writeFile(filePath, data, ENCODING)
      .then(_ => resolve(true))
      .catch(_ => reject(false));
  });

const _mkdir = filePath =>
  new Promise((resolve, reject) => {
    RNFS.mkdir(filePath)
      .then(_ => resolve(true))
      .catch(_ => reject(false));
  });

const _readDir = filePath =>
  new Promise((resolve, reject) => {
    RNFS.readDir(filePath)
      .then(async res => {
        const files = await Promise.all(res.map(file => _readFileParsed(file.path)));
        resolve(files);
      })
      .catch(_ => reject(false));
  });

const _readFile = filePath =>
  new Promise((resolve, reject) => {
    RNFS.readFile(filePath, ENCODING)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
const _readFileParsed = filePath =>
  new Promise((resolve, reject) => {
    RNFS.readFile(filePath, ENCODING)
      .then(res => resolve(JSON.parse(res)))
      .catch(err => reject(err));
  });

export const readRoutes = userId =>
  new Promise(async (resolve, reject) => {
    try {
      const folderPath = `${ROUTES_PATH}/${userId}`;
      const exist = await _exists(folderPath);
      !exist && (await _mkdir(folderPath));
      const data = await _readDir(folderPath);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const readActivities = (direction, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const folderPath = `${getDirectionPath(direction)}/${userId}`;
      const exist = await _exists(folderPath);
      !exist && (await _mkdir(folderPath));
      const data = await _readDir(folderPath);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const readSettings = type =>
  new Promise(async (resolve, reject) => {
    try {
      const path = getSettingsPath(type);
      const data = await _readFile(path);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });

export const writeSettings = (obj, type) =>
  new Promise(async (resolve, reject) => {
    try {
      const path = getSettingsPath(type);
      const deleted = await _deleteFile(path);
      const written = deleted && (await _writeFile(path, JSON.stringify(obj)));
      written ? resolve(written) : reject(written);
    } catch (err) {
      reject(err);
    }
  });

export const writeRoutes = (userId, id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const folderPath = `${ROUTES_PATH}/${userId}`;
      const filePath = `${folderPath}/${id}${EXT_JSON}`;
      const exist = await _exists(folderPath);
      !exist && (await _mkdir(folderPath));
      const written = await _writeFile(filePath, JSON.stringify(data));
      resolve(written);
    } catch (err) {
      reject(err);
    }
  });
export const writeActivity = (direction, userId, id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const folderPath = `${getDirectionPath(direction)}/${userId}`;
      const filePath = `${folderPath}/${id}${EXT_JSON}`;
      const exist = await _exists(folderPath);
      !exist && (await _mkdir(folderPath));
      const written = await _writeFile(filePath, JSON.stringify(data));
      resolve(written);
    } catch (err) {
      reject(err);
    }
  });
export const removeActivity = (direction, userId, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const path = `${getDirectionPath(direction)}/${userId}/${id}${EXT_JSON}`;
      const removed = await _deleteFile(path);
      resolve(removed);
    } catch (err) {
      reject(err);
    }
  });
export const removeRoute = (userId, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const path = `${ROUTES_PATH}/${userId}/${id}${EXT_JSON}`;
      const removed = await _deleteFile(path);
      resolve(removed);
    } catch (err) {
      reject(err);
    }
  });

export const initialLoad = () =>
  Promise.all([
    _mkdir(ACTIVITIES_DRIVING_PATH),
    _mkdir(ACTIVITIES_WALKING_PATH),
    _mkdir(ACTIVITIES_CYCLING_PATH),
    _mkdir(ROUTES_PATH),
    _writeFile(APP_SETTINGS_PATH, JSON.stringify(DEFAULT_APP_SETTINGS)),
    _writeFile(MAP_SETTINGS_PATH, JSON.stringify(DEFAULT_MAP_SETTINGS)),
    _writeFile(ACTIVITY_SETTINGS_PATH, JSON.stringify(DEFAULT_ACTIVITY_SETTINGS)),
    _writeFile(ROUTE_SETTINGS_PATH, JSON.stringify(DEFAULT_ROUTE_SETTINGS)),
  ]);