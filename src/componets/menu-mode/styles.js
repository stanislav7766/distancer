import {StatusBar} from 'react-native';
export {Row, Column, Form, mx0, mt10} from '../../constants/styles';
import {
  WINDOW_WIDTH,
  NAVBAR_HEIGHT,
  WINDOW_HEIGHT,
  ACCENT_ORANGE,
  ACCENT_RED,
  ACCENT_GREEN,
} from '../../constants/constants';
import {btnContainerStyle, btnTextStyle} from '../../constants/styles';

const hasNotch = StatusBar.currentHeight > 24;
const padding = 10;

export const Styles = themeStyle => {
  const appSettingsStyle = {
    fontSize: 18,
    color: themeStyle.textColorSecondary,
  };
  const avatarTitleStyle = {
    fontSize: 20,
    color: themeStyle.textColorSecondary,
    textAlign: 'center',
  };
  return {appSettingsStyle, avatarTitleStyle};
};

export const styleWrap = {
  marginTop: 10,
  marginRight: WINDOW_WIDTH / 4,
  marginLeft: WINDOW_WIDTH / 4,
  justifyContent: 'center',
  flexDirection: 'row',
};

export const mrNeg = {
  marginRight: -padding,
};
export const mb30 = {
  marginBottom: 30,
};

export const scrollViewStyle = {
  maxHeight: WINDOW_HEIGHT - NAVBAR_HEIGHT - padding * 2,
  top: NAVBAR_HEIGHT + (hasNotch ? 0 : StatusBar.currentHeight),
  marginTop: padding,
};

export const pickerSizes = {
  width: 100,
  height: 200,
  itemHeight: 40,
};
export const pickerTextStyle = {
  color: ACCENT_ORANGE,
};
export const orangeColor = {
  color: ACCENT_ORANGE,
};

export const greenBg = {
  backgroundColor: ACCENT_GREEN,
};
export const redBg = {
  backgroundColor: ACCENT_RED,
};

export const btnLogoutStyles = {
  containerStyle: {
    ...btnContainerStyle,
    ...redBg,
    height: 40,
  },
  textStyle: btnTextStyle,
};
export const btnProfileStyles = {
  containerStyle: {
    ...btnContainerStyle,
    height: 40,
  },
  textStyle: btnTextStyle,
};

export const btnSignUpStyles = {
  containerStyle: {
    ...btnContainerStyle,
    ...greenBg,
    height: 40,
  },
  textStyle: btnTextStyle,
};
export const btnSignInStyles = {
  containerStyle: {
    ...btnContainerStyle,
    height: 40,
  },
  textStyle: btnTextStyle,
};
