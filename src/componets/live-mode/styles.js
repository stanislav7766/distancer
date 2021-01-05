import {ACCENT_GREEN, ACCENT_ORANGE} from '../../constants/constants';
import {btnContainerStyle, btnTextStyle} from '../../constants/styles';

export {Row, Column, mt10} from '../../constants/styles';

export const Styles = themeStyle => {
  const liveInfoContainer = {
    width: 155,
    height: 96,
    backgroundColor: themeStyle.accentColor,
  };
  const liveInfoText = {
    color: '#fff',
  };
  const liveInfoSubText = {
    color: '#fff',
  };

  return {liveInfoContainer, liveInfoText, liveInfoSubText};
};

const orangeBg = {
  backgroundColor: ACCENT_ORANGE,
};
const greenBg = {
  backgroundColor: ACCENT_GREEN,
};

export const btnStartStyles = {
  containerStyle: btnContainerStyle,
  textStyle: btnTextStyle,
};
export const btnPauseStyles = {
  containerStyle: {
    ...btnContainerStyle,
    ...orangeBg,
  },
  textStyle: btnTextStyle,
};
export const btnContinueStyles = {
  containerStyle: {
    ...btnContainerStyle,
    ...greenBg,
  },
  textStyle: btnTextStyle,
};
