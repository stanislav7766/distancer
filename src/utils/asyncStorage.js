import AsyncStorage from '@react-native-community/async-storage';

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

export const updateItem = async (key, data) => {
  const string = await AsyncStorage.getItem(key);
  const oldData = JSON.parse(string) || {};
  await setItem(key, {...oldData, ...data});
};
