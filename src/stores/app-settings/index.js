import {createContext, useContext} from 'react';
import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_SCREEN, DEFAULT_THEME} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';

export class AppSettingsStore {
  constructor({themeStore, appModeStore, authStore}) {
    this.themeStore = themeStore;
    this.appModeStore = appModeStore;
    this.authStore = authStore;
    this.theme = themeStore.theme;

    observe(this.themeStore, this._listenThemeStore);
    makeAutoObservable(this);
    observe(this, this._listenDefaultScreen);
  }

  theme = this?.themeStore?.theme ?? DEFAULT_THEME;
  defaultScreen = DEFAULT_SCREEN;
  _loadedSettings = false;

  setLoadedSettings = () => {
    this._loadedSettings = true;
  };

  setDefaultScreen = defaultScreen => {
    this.defaultScreen = defaultScreen;
    this.setLoadedSettings();
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
  _listenDefaultScreen = ({name, newValue}) => {
    if (name !== 'defaultScreen') return;
    !this._loadedSettings && this.authStore.authorized && this.appModeStore.setAppMode(newValue);
  };
}

export const AppSettingsContext = createContext();
export const useAppSettings = () => useContext(AppSettingsContext);
