import RNFS from 'react-native-fs';

const SETTINGS_PATH = RNFS.DocumentDirectoryPath + '/settings.json';
const ROUTES_PATH = RNFS.DocumentDirectoryPath + '/routes.json';

const _deleteFile = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.exists(filePath)
      .then(res => {
        res &&
          RNFS.unlink(filePath)
            .then(() => resolve(true))
            .catch(err => reject(false));
      })
      .catch(err => reject(false));
  });

const _writeFile = async (filePath, data) =>
  new Promise((resolve, reject) => {
    RNFS.writeFile(filePath, data, 'utf8')
      .then(_ => resolve(true))
      .catch(err => reject(false));
  });

const _readFile = async filePath =>
  new Promise((resolve, reject) => {
    RNFS.readFile(filePath, 'utf8')
      .then(res => resolve(res))
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
    const deleted = await _deleteFile(SETTINGS_PATH);
    const written = deleted && (await _writeFile(SETTINGS_PATH, JSON.stringify(obj)));
    written ? resolve(written) : reject(written);
  });

export const writeRoutes = async arrRoutes =>
  new Promise(async (resolve, reject) => {
    const deleted = await _deleteFile(ROUTES_PATH);
    const written = deleted && (await _writeFile(ROUTES_PATH, JSON.stringify(arrRoutes)));
    written ? resolve(written) : reject(written);
  });

export const initialLoad = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await _writeFile(SETTINGS_PATH, JSON.stringify({theme: 'light'}));
      await _writeFile(ROUTES_PATH, JSON.stringify([]));
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
