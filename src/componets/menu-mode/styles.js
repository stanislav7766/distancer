export {Row, Column, Form} from '../../constants/styles';
import {WINDOW_WIDTH, NAVBAR_HEIGHT, WINDOW_HEIGHT} from '../../constants/constants';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
  };
  const btnDims = {
    width: 155,
    height: 45,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };

  const bgGreen = {
    backgroundColor: '#BFE3A5',
  };
  const bgRed = {
    backgroundColor: '#FE5E60',
  };

  const btnDeleteAccount = {
    ...btnDims,
    ...bgRed,
    width: 200,
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
  const avatarTitleStyle = {
    fontSize: 20,
    color: themeStyle.textColorSecondary,
    textAlign: 'center',
  };
  return {styleItem, btnDims, bgGreen, bgRed, styleIcon, appSettingsStyle, avatarTitleStyle, btnDeleteAccount};
};

export const styleWrap = {
  marginTop: 10,
  marginRight: WINDOW_WIDTH / 4,
  marginLeft: WINDOW_WIDTH / 4,
  justifyContent: 'center',
  flexDirection: 'row',
};

export const mx0 = {
  marginRight: '0px',
  marginLeft: '0px',
};

export const scrollViewStyle = {maxHeight: WINDOW_HEIGHT * 0.5 - NAVBAR_HEIGHT - 50, top: 10};
