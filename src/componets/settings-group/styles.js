export {Row, Column, Form, mx0, mt10} from '~/constants/styles';
import {ACCENT_GREEN, ACCENT_ORANGE, ACCENT_RED} from '~/constants/constants';
import {btnContainerStyle, btnTextStyle} from '~/constants/styles';

export const Styles = themeStyle => {
  const avatarTitleStyle = {
    fontSize: 20,
    color: themeStyle.textColorSecondary,
    textAlign: 'center',
  };
  return {avatarTitleStyle};
};

export const orangeColor = {
  color: ACCENT_ORANGE,
};

export const mb30 = {
  marginBottom: 30,
};
const redBg = {
  backgroundColor: ACCENT_RED,
};
const greenBg = {
  backgroundColor: ACCENT_GREEN,
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
