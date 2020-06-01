import React, {Fragment} from 'react';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import SelectDirection from './SelectDirection';
import {Styles} from './styles';
import {WINDOW_HEIGHT, DIRECTIONS_MODE} from '../../constants/constants';
const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;

const DirectionsBar = ({themeStyle, setMode}) => {
  const {styleDirections, styleCarIcon, styleBikeIcon, styleManIcon} = Styles(themeStyle, WINDOW_HEIGHT);

  const IconDrivingWrap = <SelectDirection themeStyle={themeStyle} mode={DRIVING} />;
  const IconCyclingWrap = <SelectDirection themeStyle={themeStyle} mode={CYCLING} />;
  const IconWalkingWrap = <SelectDirection themeStyle={themeStyle} mode={WALKING} />;

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
