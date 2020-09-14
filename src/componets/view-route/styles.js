export {Row, Column} from '../../constants/styles';

export const stylesTextKM = {
  color: '#fff',
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 22,
  lineHeight: 30,
};

export const stylesActivityProps = {
  color: '#fff',
  fontFamily: 'Noto Sans',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 20,
  lineHeight: 25,
};

export const Styles = themeStyle => {
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColorSecondary,
  };
  const liveIconDims = {
    top: 0,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };

  return {btnDims, liveIconDims};
};
