export {Row, Column} from '../../constants/styles';

export const stylesTextKM = {
  color: '#fff',
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 22,
  lineHeight: 30,
};

export const Styles = themeStyle => {
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };
  const arrowIconDims = {
    top: 10,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  const dragIconDims = {
    top: 10,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };
  const styleDoubleBtn = typeSwitched => ({
    colorL: typeSwitched ? themeStyle.accentColor : '#fff',
    colorR: typeSwitched ? '#fff' : themeStyle.accentColor,
    backgroundColor: themeStyle.backgroundColor,
    accentColor: themeStyle.accentColor,
  });
  return {arrowIconDims, dragIconDims, btnDims, styleDoubleBtn};
};
