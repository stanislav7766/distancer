import React, {Fragment} from 'react';
import IconDriving from '../svg-icons/icon-driving/IconDriving';
import IconWalking from '../svg-icons/icon-walking/IconWalking';
import IconCycling from '../svg-icons/icon-cycling/IconCycling';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {Styles} from './styles';
import {WINDOW_HEIGHT, DIRECTIONS_MODE} from '../../constants/constants';
const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;

const DirectionsBar = ({themeStyle, mode, setMode}) => {
  const defineTheme = curr => (mode === curr ? themeStyle.accentColor : themeStyle.textColorSecondary);
  const {styleDirections, styleCarIcon, styleBikeIcon, styleManIcon} = Styles(themeStyle, WINDOW_HEIGHT);

  const IconDrivingWrap = <IconDriving width={32} height={32} fill={defineTheme(DRIVING)} />;
  const IconCyclingWrap = <IconCycling width={32} height={32} fill={defineTheme(CYCLING)} />;
  const IconWalkingWrap = <IconWalking width={32} height={32} fill={defineTheme(WALKING)} />;

  const onPressDriving = () => setMode(DRIVING);
  const onPressWalking = () => setMode(WALKING);
  const onPressCycling = () => setMode(CYCLING);

  return (
    <RoundedIcon
      style={styleDirections}
      IconComponent={
        <Fragment>
          <RoundedIcon style={styleCarIcon} IconComponent={IconDrivingWrap} onPress={onPressDriving} />
          <RoundedIcon style={styleManIcon} IconComponent={IconWalkingWrap} onPress={onPressWalking} />
          <RoundedIcon style={styleBikeIcon} IconComponent={IconCyclingWrap} onPress={onPressCycling} />
        </Fragment>
      }
    />
  );
};

export default DirectionsBar;
