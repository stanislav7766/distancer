import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {THEMES} from '../../constants/constants';
import {ThemeStyle} from '../../constants/styles';

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

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);
