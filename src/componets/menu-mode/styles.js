export {Row, Column, Form} from '../../constants/styles';
import {WINDOW_WIDTH} from '../../constants/constants';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
  };
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };
  const bgGreen = {
    backgroundColor: '#BFE3A5',
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

  const appSettingsStyle = {
    fontSize: 18,
    color: themeStyle.textColorSecondary,
  };
  return {styleItem, btnDims, bgGreen, styleIcon, appSettingsStyle};
};

export const styleWrap = {
  marginTop: 10,
  marginRight: WINDOW_WIDTH / 4,
  marginLeft: WINDOW_WIDTH / 4,
  justifyContent: 'center',
  flexDirection: 'row',
};
