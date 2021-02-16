import {NAVBAR_HEIGHT} from '~/constants/constants';
export {Row, Column} from '~/constants/styles';

export const Styles = themeStyle => {
  const modalStyle = {
    bottom: NAVBAR_HEIGHT,
    backgroundColor: themeStyle.backgroundColor,
  };
  return {modalStyle};
};
