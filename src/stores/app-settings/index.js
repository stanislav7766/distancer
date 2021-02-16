import {createContext, useContext} from 'react';
import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_SCREEN, DEFAULT_THEME} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';

export class AppSettingsStore {
  constructor(themeStore) {
    this.themeStore = themeStore;
    this.theme = themeStore.theme;
    observe(this.themeStore, this._listenThemeStore);
    makeAutoObservable(this);
  }

  theme = this?.themeStore?.theme ?? DEFAULT_THEME;
  defaultScreen = DEFAULT_SCREEN;

  setDefaultScreen = defaultScreen => {
    this.defaultScreen = defaultScreen;
  };
  setTheme = theme => {
    this.themeStore.setTheme(theme);
  };
  setAppSettings = ({theme, defaultScreen}) => {
    isExist(theme) && this.setTheme(theme);
    isExist(defaultScreen) && this.setDefaultScreen(defaultScreen);
  };

  _listenThemeStore = ({name, oldValue, newValue}) => {
    name === 'theme' && this.theme === oldValue && (this.theme = newValue);
  };
}

export const AppSettingsContext = createContext();
export const useAppSettings = () => useContext(AppSettingsContext);
