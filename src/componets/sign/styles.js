export {Row, Column, Form} from '../../constants/styles';

export const Styles = themeStyle => {
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };
  const btnGoogleDims = {height: 46};
  const inputStyle = {
    textColor: themeStyle.textColor,
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
  };

  return {btnDims, btnGoogleDims, inputStyle, arrowIconDims, greetingStyle, subGreetingStyle};
};
