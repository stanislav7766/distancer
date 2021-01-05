import {NAVBAR_HEIGHT} from '../../constants/constants';
export {Row, Column} from '../../constants/styles';

export const styleModal = {
  width: '100%',
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: NAVBAR_HEIGHT,
  borderTopRightRadius: 15,
  borderTopLeftRadius: 15,
};

export const noModalRadius = {
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
};

export const styleContainer = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};
