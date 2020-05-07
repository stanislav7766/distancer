export {Row, Column} from '../../constants/styles';
import {WINDOW_WIDTH} from '../../constants/constants';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
  };
  const styleIcon = {
    position: 'relative',
    left: 10,
    top: 10,
    width: 80,
    height: 40,
    alignItems: 'flex-start',
    paddingLeft: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  return {styleItem, styleIcon};
};

export const styleWrap = {
  marginTop: 10,
  marginRight: WINDOW_WIDTH / 4,
  marginLeft: WINDOW_WIDTH / 4,
  justifyContent: 'center',
  flexDirection: 'row',
};
