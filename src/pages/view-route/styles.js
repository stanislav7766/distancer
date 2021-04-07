import {WINDOW_WIDTH, WINDOW_HEIGHT} from '~/constants/constants';

export {Row, Column} from '~/constants/styles';

export const styleContainer = {
  height: WINDOW_HEIGHT,
  width: WINDOW_WIDTH,
};

export const mapStyle = {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
};

export const Styles = themeStyle => {
  const styleCancelIcon = {
    left: 10,
    top: 10,
    width: 50,
    height: 50,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  const styleEditIcon = {
    right: 10,
    bottom: WINDOW_HEIGHT * 0.35,
    width: 50,
    height: 50,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  return {styleCancelIcon, styleEditIcon};
};
