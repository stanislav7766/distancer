import {btnContainerStyle, btnTextStyle} from '~/constants/styles';
import {filterByKey} from '~/utils/common-helpers/obj-helpers';

export {Row, Column, Form, mt10} from '~/constants/styles';

const btnContStyle = filterByKey('width', btnContainerStyle);

export const Styles = themeStyle => {
  const inputStyle = {
    textColor: themeStyle.textColorThird,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  const arrowIconDims = {
    top: 0,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  const greetingStyle = {
    fontSize: 25,
    color: themeStyle.textColorThird,
  };
  const subGreetingStyle = {
    fontSize: 22,
    color: themeStyle.textColorSecondary,
    textAlign: 'right',
  };

  return {inputStyle, arrowIconDims, greetingStyle, subGreetingStyle};
};

export const btnSignInStyles = {
  containerStyle: {...btnContStyle, height: 40},
  textStyle: btnTextStyle,
};
export const btnSignUpStyles = {
  containerStyle: {...btnContStyle, height: 40},
  textStyle: btnTextStyle,
};
export const btnGoogleStyles = {
  containerStyle: {height: 40},
  textStyle: {
    ...btnTextStyle,
    color: '#8d8d8d',
    fontSize: 18,
  },
};

export const mt30 = {
  marginTop: 30,
};
export const mb30 = {
  marginBottom: 30,
};
