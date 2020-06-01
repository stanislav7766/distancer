import {ACCENT_BLUE} from '../../constants/constants';
export const styleIcon = {
  position: 'relative',
  width: 155,
  height: 45,
};
export const styleBtn = {
  position: 'relative',
  width: 155 / 2,
  color: ACCENT_BLUE,
  textAlign: 'center',
  fontSize: 22,
  backgroundColor: 'transparent',
};

export const styleSwitch = {
  position: 'absolute',
};

export const styleTextColor = color => ({
  color,
});
export const styleTextAlign = textAlign => ({
  textAlign,
});
