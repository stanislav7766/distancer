import {NativeModules} from 'react-native';
import {DEFAULT_LOCALE} from '~/constants/constants';

export const getLocaleId = () => {
  const {localeIdentifier = DEFAULT_LOCALE} = NativeModules?.I18nManager;
  return localeIdentifier;
};
