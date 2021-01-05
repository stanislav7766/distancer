import {btnContainerStyle, btnTextStyle} from '../../constants/styles';

export {Row, Column, mt10} from '../../constants/styles';

export const btnSaveStyles = {
  containerStyle: btnContainerStyle,
  textStyle: btnTextStyle,
};

export const Styles = themeStyle => {
  const stylesTextKM = {
    color: themeStyle.textColorSecondary,
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 22,
    lineHeight: 30,
  };
  const arrowIconDims = {
    top: 0,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  const dragIconDims = {
    top: 0,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  return {arrowIconDims, dragIconDims, stylesTextKM};
};
