import RNFS from 'react-native-fs';

const EXT_JSON = '.json';
const SETTINGS_PATH = RNFS.DocumentDirectoryPath + '/settings' + EXT_JSON;
const ROUTES_PATH = RNFS.DocumentDirectoryPath + '/routes' + EXT_JSON;
const ACTIVITIES_WALKING_PATH = RNFS.DocumentDirectoryPath + '/activities/walking';
const ACTIVITIES_CYCLING_PATH = RNFS.DocumentDirectoryPath + '/activities/cycling';
const ACTIVITIES_DRIVING_PATH = RNFS.DocumentDirectoryPath + '/activities/driving';

const ENCODING = 'utf8';

const getDirectionPath = mode =>
  ({
    walking: ACTIVITIES_WALKING_PATH,
    cycling: ACTIVITIES_CYCLING_PATH,
    driving: ACTIVITIES_DRIVING_PATH,
  }[mode]);

const _deleteFile = async filePath =>
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

const _exists = async path =>
  new Promise((resolve, reject) => {
    RNFS.exists(path)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

const _writeFile = async (filePath, data) =>
  new Promise((resolve, reject) => {
    RNFS.writeFile(filePath, data, ENCODING)
      .then(_ => resolve(true))
      .catch(_ => reject(false));
  });

const _mkdir = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.mkdir(filePath)
      .then(_ => resolve(true))
      .catch(_ => reject(false));
  });

const _readDir = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.readDir(filePath)
      .then(async res => {
        const files = await Promise.all(res.map(file => _readFileParsed(file.path)));
        resolve(files);
      })
      .catch(_ => reject(false));
  });

const _readFile = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.readFile(filePath, ENCODING)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
const _readFileParsed = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.readFile(filePath, ENCODING)
      .then(res => resolve(JSON.parse(res)))
      .catch(err => reject(err));
  });

export const readRoutes = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await _readFile(ROUTES_PATH);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });

export const readActivities = async (direction, userId) =>
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

export const readSettings = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await _readFile(SETTINGS_PATH);
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });

export const writeSettings = async obj =>
  new Promise(async (resolve, reject) => {
    try {
      const deleted = await _deleteFile(SETTINGS_PATH);
      const written = deleted && (await _writeFile(SETTINGS_PATH, JSON.stringify(obj)));
      written ? resolve(written) : reject(written);
    } catch (err) {
      reject(err);
    }
  });

export const writeRoutes = async arrRoutes =>
  new Promise(async (resolve, reject) => {
    try {
      const deleted = await _deleteFile(ROUTES_PATH);
      const written = deleted && (await _writeFile(ROUTES_PATH, JSON.stringify(arrRoutes)));
      written ? resolve(written) : reject(written);
    } catch (err) {
      reject(err);
    }
  });
export const writeActivity = async (direction, userId, id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const folderPath = `${getDirectionPath(direction)}/${userId}`;
      const filePath = `${folderPath}/${id}${EXT_JSON}`;
      const exist = await _exists(folderPath);
      !exist && (await _mkdir(folderPath));
      const written = await _writeFile(filePath, JSON.stringify(data));
      written ? resolve(written) : reject(written);
    } catch (err) {
      reject(err);
    }
  });
export const removeActivity = async (direction, userId, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const path = `${getDirectionPath(direction)}/${userId}/${id}${EXT_JSON}`;
      const removed = await _deleteFile(path);
      resolve(removed);
    } catch (err) {
      reject(err);
    }
  });

export const initialLoad = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await Promise.all([
        _mkdir(ACTIVITIES_DRIVING_PATH),
        _mkdir(ACTIVITIES_WALKING_PATH),
        _mkdir(ACTIVITIES_CYCLING_PATH),
        _writeFile(SETTINGS_PATH, JSON.stringify({theme: 'light'})),
        _writeFile(ROUTES_PATH, JSON.stringify([])),
      ]);

      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
