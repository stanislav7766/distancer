import {createContext, useContext} from 'react';
import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_SCREEN, DEFAULT_THEME} from '../../constants/constants';

export class AppSettingsStore {
  constructor(themeStore) {
    this.themeStore = themeStore;
    this.theme = themeStore.theme;
    observe(this.themeStore, ({name, oldValue, newValue}) => {
      name === 'theme' && this.theme === oldValue && (this.theme = newValue);
    });
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
    //valid
    theme && this.setTheme(theme);
    defaultScreen && this.setDefaultScreen(defaultScreen);
  };
}

export const AppSettingsContext = createContext();
export const useAppSettings = () => useContext(AppSettingsContext);