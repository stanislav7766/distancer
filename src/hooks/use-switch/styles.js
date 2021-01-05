import {ACCENT_ORANGE, ACCENT_RED, THEMES} from '../../constants/constants';

export const switchThemeSize = {
  width: 45,
  height: 22,
};
export const switchCommonSize = {
  width: 45,
  height: 22,
};
export const switchDrawModeSize = {
  width: 80,
  height: 35,
};

export const getCommonStyles = themeStyle => {
  const falseStyle = {backgroundColor: themeStyle.textColorSecondary, accentColor: '#fff'};
  const trueStyle = {backgroundColor: themeStyle.accentColor, accentColor: '#fff'};
  return {falseStyle, trueStyle};
};
export const getThemeStyles = themeStyle => {
  const falseStyle = {backgroundColor: themeStyle.textColorSecondary, accentColor: '#fff'};
  const trueStyle = {backgroundColor: themeStyle.accentColor, accentColor: '#fff'};
  return {falseStyle, trueStyle};
};
export const getDrawModeStyles = themeStyle => {
  const falseStyle = {backgroundColor: ACCENT_ORANGE, accentColor: '#fff'};
  const trueStyle = {backgroundColor: ACCENT_RED, accentColor: '#fff'};
  return {falseStyle, trueStyle};
};

export const isLightTheme = theme => theme === THEMES.LIGHT;
