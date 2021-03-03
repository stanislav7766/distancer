import {makeAutoObservable, observe} from 'mobx';
import {DEFAULT_LOCALE, DEFAULT_SCREEN, DEFAULT_THEME} from '~/constants/constants';
import {isExist} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

export class AppSettingsStore {
  constructor() {
    this.themeStore = storesDI.Inject('themeStore');
    this.appModeStore = storesDI.Inject('appModeStore');
    this.authStore = storesDI.Inject('authStore');
    this.localeStore = storesDI.Inject('localeStore');
    this.theme = this.themeStore.theme;

    observe(this.themeStore, this._listenThemeStore);
    observe(this.localeStore, this._listenLocaleStore);
    makeAutoObservable(this);
    observe(this, this._listenDefaultScreen);
  }

  theme = this?.themeStore?.theme ?? DEFAULT_THEME;
  locale = this?.localeStore?.locale ?? DEFAULT_LOCALE;
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
  setLocale = locale => {
    this.localeStore.setLocale(locale);
  };
  setAppSettings = ({theme, defaultScreen, locale}) => {
    isExist(theme) && this.setTheme(theme);
    isExist(defaultScreen) && this.setDefaultScreen(defaultScreen);
    isExist(locale) && this.setLocale(locale);
  };

  _listenThemeStore = ({name, oldValue, newValue}) => {
    name === 'theme' && this.theme === oldValue && (this.theme = newValue);
  };
  _listenLocaleStore = ({name, oldValue, newValue}) => {
    name === 'locale' && this.locale === oldValue && (this.locale = newValue);
  };
  _listenDefaultScreen = ({name, newValue}) => {
    if (name !== 'defaultScreen') return;
    !this._loadedSettings && this.authStore.authorized && this.appModeStore.setAppMode(newValue);
  };
}

export const useAppSettings = () => storesDI.Inject('appSettingsStore');
