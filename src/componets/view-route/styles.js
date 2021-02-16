import {ACCENT_RED} from '~/constants/constants';
import {btnContainerStyle, btnTextStyle} from '~/constants/styles';

export {Row, Column, mt10, mx0} from '~/constants/styles';

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
  const liveIconDims = {
    top: 0,
    left: 0,
    backgroundColor: themeStyle.backgroundColorSecondary,
    position: 'relative',
  };

  return {liveIconDims};
};

export const btnDeleteStyles = {
  containerStyle: {
    ...btnContainerStyle,
    backgroundColor: ACCENT_RED,
  },
  textStyle: btnTextStyle,
};
