import {makeAutoObservable} from 'mobx';
import {THEMES} from '~/constants/constants';
import {ThemeStyle} from '~/constants/styles';
import {storesDI} from '~/utils/store-di';

export class ThemeStore {
  constructor() {
    makeAutoObservable(this);
  }

  theme = THEMES.LIGHT;
  themeStyle = ThemeStyle[this.theme];

  setTheme = theme => {
    this.theme = theme;
    this.themeStyle = ThemeStyle[theme];
  };
}

storesDI.Injectable('themeStore')(ThemeStore);

export const useTheme = () => storesDI.Inject('themeStore');
