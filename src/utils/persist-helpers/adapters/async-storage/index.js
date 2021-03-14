import AsyncStorage from '@react-native-community/async-storage';
import {StorageAdapter} from 'mobx-persist-store';

const readStore = async name => {
  const data = await AsyncStorage.getItem(name);
  return data;
};

const writeStore = async (name, content) => {
  await AsyncStorage.setItem(name, content);
};

export const asyncStorageAdapter = new StorageAdapter({
  read: readStore,
  write: writeStore,
});
