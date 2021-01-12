import useSvgFactory from '../../hooks/use-svg-factory';
import {getDriving} from '../../assets/svg-icons/driving';
import {getWalking} from '../../assets/svg-icons/walking';
import {getCycling} from '../../assets/svg-icons/cycling';
import {DIRECTIONS_MODE} from '../../constants/constants';

const directionParams = {
  width: 32,
  height: 32,
};

const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;
const SelectDirection = ({mode, themeStyle, currentMode}) => {
  const defineTheme = curr => (currentMode === curr ? themeStyle.accentColor : themeStyle.textColorSecondary);

  const ModeCall = type =>
    ({
      [WALKING]: useSvgFactory(getWalking, {...directionParams, fillAccent: defineTheme(WALKING)}),
      [CYCLING]: useSvgFactory(getCycling, {...directionParams, fillAccent: defineTheme(CYCLING)}),
      [DRIVING]: useSvgFactory(getDriving, {...directionParams, fillAccent: defineTheme(DRIVING)}),
      ['']: null,
    }[type]);
  return ModeCall(mode);
};

export default SelectDirection;
