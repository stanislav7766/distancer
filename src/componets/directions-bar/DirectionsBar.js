import React from 'react';
import {RoundedIcon} from '~/componets/rounded-icon';
import SelectDirection from './SelectDirection';
import {Styles, styles} from './styles';
import {WINDOW_HEIGHT, DIRECTIONS_MODE} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {useDirectionsMode} from '~/stores/directions-mode';
const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;

const DirectionsBar = ({themeStyle}) => {
  const {setDirectionsMode, directionsMode, isDirectionsMode} = useDirectionsMode();
  const {styleDirections} = Styles(themeStyle, WINDOW_HEIGHT);
  const defineColor = curr => (directionsMode === curr ? themeStyle.accentColor : themeStyle.textColorSecondary);

  const IconDrivingWrap = <SelectDirection mode={DRIVING} color={defineColor(DRIVING)} />;
  const IconCyclingWrap = <SelectDirection mode={CYCLING} color={defineColor(CYCLING)} />;
  const IconWalkingWrap = <SelectDirection mode={WALKING} color={defineColor(WALKING)} />;

  const onPressDriving = () => setDirectionsMode(DRIVING);
  const onPressWalking = () => setDirectionsMode(WALKING);
  const onPressCycling = () => setDirectionsMode(CYCLING);

  const Directions = (
    <>
      <RoundedIcon style={styles.carIcon} IconComponent={IconDrivingWrap} onPress={onPressDriving} />
      <RoundedIcon style={styles.manIcon} IconComponent={IconWalkingWrap} onPress={onPressWalking} />
      <RoundedIcon style={styles.bikeIcon} IconComponent={IconCyclingWrap} onPress={onPressCycling} />
    </>
  );

  return isDirectionsMode && <RoundedIcon style={styleDirections} IconComponent={Directions} />;
};

export default observer(DirectionsBar);
