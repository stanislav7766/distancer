export {Row, Column} from '../../constants/styles';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 55,
  };
  const arrowIconDims = {
    top: 10,
    left: 0,
    position: 'relative',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  const inputStyle = {
    textColor: themeStyle.textColor,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  return {styleItem, arrowIconDims, inputStyle};
};
