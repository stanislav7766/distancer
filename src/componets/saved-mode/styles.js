export {Row, Column} from '../../constants/styles';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
  };
  const styleItemRoute = {
    ...styleItem,
    height: 50,
  };
  const styleItemActivity = {
    ...styleItem,
    fontSize: 12,
  };

  const btnDims = {
    width: 155,
    height: 46,
    color: themeStyle.textColorSecondary,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const btnBorder = {
    borderColor: themeStyle.accentColor,
    borderWidth: 2,
  };
  const styleFormHeaderDate = {
    color: themeStyle.textColorSecondary,
    fontSize: 15,
  };
  const styleFormHeaderInfo = {
    color: themeStyle.textColorSecondary,
    fontSize: 12,
  };

  return {styleItem, styleItemRoute, styleItemActivity, btnDims, styleFormHeaderDate, styleFormHeaderInfo, btnBorder};
};
