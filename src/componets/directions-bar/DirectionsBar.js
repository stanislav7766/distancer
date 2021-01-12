import React from 'react';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import SelectDirection from './SelectDirection';
import {Styles} from './styles';
import {WINDOW_HEIGHT, DIRECTIONS_MODE} from '../../constants/constants';
import {observer} from 'mobx-react-lite';
import {useDirectionsMode} from '../../stores/directions-mode';
const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;

const DirectionsBar = ({themeStyle}) => {
  const {setDirectionsMode, directionsMode, isDirectionsMode} = useDirectionsMode();
  const {styleDirections, styleCarIcon, styleBikeIcon, styleManIcon} = Styles(themeStyle, WINDOW_HEIGHT);

  const IconDrivingWrap = <SelectDirection themeStyle={themeStyle} mode={DRIVING} currentMode={directionsMode} />;
  const IconCyclingWrap = <SelectDirection themeStyle={themeStyle} mode={CYCLING} currentMode={directionsMode} />;
  const IconWalkingWrap = <SelectDirection themeStyle={themeStyle} mode={WALKING} currentMode={directionsMode} />;

  const onPressDriving = () => setDirectionsMode(DRIVING);
  const onPressWalking = () => setDirectionsMode(WALKING);
  const onPressCycling = () => setDirectionsMode(CYCLING);

  const Directions = (
    <>
      <RoundedIcon style={styleCarIcon} IconComponent={IconDrivingWrap} onPress={onPressDriving} />
      <RoundedIcon style={styleManIcon} IconComponent={IconWalkingWrap} onPress={onPressWalking} />
      <RoundedIcon style={styleBikeIcon} IconComponent={IconCyclingWrap} onPress={onPressCycling} />
    </>
  );

  return isDirectionsMode && <RoundedIcon style={styleDirections} IconComponent={Directions} />;
};

export default observer(DirectionsBar);
