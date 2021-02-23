import {NAVBAR_HEIGHT} from '~/constants/constants';

const bottom = {
  bottom: NAVBAR_HEIGHT + 30,
};
const top = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const containerStyleBase = {
  flex: 1,
  alignItems: 'center',
  position: 'absolute',
  alignSelf: 'center',
  justifyContent: 'center',
  height: 50,
  width: 50,
  borderRadius: 100,
  elevation: 7,
};

export const Styles = ({position = 'top', themeStyle}) => {
  const dims = position === 'top' ? {...top} : position === 'bottom' ? {...bottom} : {};

  const containerStyle = {...containerStyleBase, ...dims, backgroundColor: themeStyle.backgroundColorSecondary};

  const wrapperStyle = {
    backgroundColor: 'transparent',
  };
  const spinnerStyle = {
    height: 100,
    width: 100,
  };

  return {containerStyle, wrapperStyle, spinnerStyle};
};
