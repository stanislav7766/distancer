import React, {useContext} from 'react';
import {appModeContext} from '../../contexts/contexts';
import IconDriving from '../svg-icons/icon-driving/IconDriving';
import IconWalking from '../svg-icons/icon-walking/IconWalking';
import IconCycling from '../svg-icons/icon-cycling/IconCycling';
import {DIRECTIONS_MODE} from '../../constants/constants';

const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;
const SelectDirection = ({mode, themeStyle}) => {
  const {directionsMode} = useContext(appModeContext);
  const defineTheme = curr => (directionsMode === curr ? themeStyle.accentColor : themeStyle.textColorSecondary);

  const ModeCall = type =>
    ({
      [WALKING]: <IconWalking width={30} height={30} fill={defineTheme(WALKING)} />,
      [CYCLING]: <IconCycling width={32} height={32} fill={defineTheme(CYCLING)} />,
      [DRIVING]: <IconDriving width={32} height={32} fill={defineTheme(DRIVING)} />,
      ['']: null,
    }[type]);
  return ModeCall(mode);
};

export default SelectDirection;
