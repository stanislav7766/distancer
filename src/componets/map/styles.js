import {WINDOW_WIDTH, WINDOW_HEIGHT} from '~/constants/constants';

export const styleContainer = {
  height: WINDOW_HEIGHT,
  width: WINDOW_WIDTH,
};

export const mapStyle = {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
};

export const Styles = (themeStyle, height) => {
  const styleGpsIcon = {
    right: 10,
    bottom: height * 0.35,
    width: 50,
    height: 50,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleInfoIcon = {
    left: 10,
    bottom: height * 0.35,
    width: 50,
    height: 50,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleMenuIcon = {
    left: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleCancelIcon = {
    right: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  return {styleCancelIcon, styleGpsIcon, styleInfoIcon, styleMenuIcon};
};
