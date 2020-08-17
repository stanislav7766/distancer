export {Row, Column} from '../../constants/styles';

export const Styles = themeStyle => {
  const styleItem = {
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
  };

  const btnDims = {
    width: 155,
    height: 46,
    color: themeStyle.textColorSecondary,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  return {styleItem, btnDims};
};
