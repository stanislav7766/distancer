import {WINDOW_WIDTH} from '../../constants/constants';
export {Row, Column} from '../../constants/styles';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 55,
  };

  return {styleItem};
};

export const styleWrap = {
  marginRight: WINDOW_WIDTH * 0.15,
  marginLeft: WINDOW_WIDTH * 0.15,
};
