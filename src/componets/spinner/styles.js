import {WINDOW_HEIGHT} from '../../constants/constants';

const bottom = {
  left: 0,
  right: 0,
  top: 0,
  bottom: -WINDOW_HEIGHT * 0.8,
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
  zIndex: 1000,
  position: 'absolute',
  justifyContent: 'center',
};

export const Styles = (position = 'top') => {
  const dims = position === 'top' ? {...top} : position === 'bottom' ? {...bottom} : {};

  const containerStyle = {...containerStyleBase, ...dims};

  const wrapperStyle = {
    backgroundColor: 'transparent',
  };
  const spinnerStyle = {
    height: 120,
    width: 120,
  };
  return {containerStyle, wrapperStyle, spinnerStyle};
};
