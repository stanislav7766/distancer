export {Row, Column, mt10} from '~/constants/styles';

export const mt20 = {
  marginTop: 20,
};

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
  };
  const arrowIconDims = {
    top: 10,
    left: 0,
    position: 'relative',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  const inputStyle = {
    textColor: themeStyle.textColorThird,
    underlineFocusedColor: themeStyle.accentColor,
    underlineBluredColor: themeStyle.textColorSecondary,
    placeholderColor: themeStyle.textColorSecondary,
  };
  return {styleItem, arrowIconDims, inputStyle};
};
