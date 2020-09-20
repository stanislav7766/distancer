import {AsyncStorage} from 'react-native';

export const getItem = async key => {
  const string = await AsyncStorage.getItem(key);
  return JSON.parse(string);
};

export const setItem = async (key, data) => {
  const string = JSON.stringify(data);
  await AsyncStorage.setItem(key, string);
};
export const removeItem = async key => {
  await AsyncStorage.removeItem(key);
};
