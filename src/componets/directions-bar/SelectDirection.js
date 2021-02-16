import useSvgFactory from '~/hooks/use-svg-factory';
import {getDriving} from '~/assets/svg-icons/driving';
import {getWalking} from '~/assets/svg-icons/walking';
import {getCycling} from '~/assets/svg-icons/cycling';
import {DIRECTIONS_MODE} from '~/constants/constants';

const directionParams = {
  width: 32,
  height: 32,
};

const {WALKING, CYCLING, DRIVING} = DIRECTIONS_MODE;
const SelectDirection = ({mode, color}) => {
  const ModeCall = type =>
    ({
      [WALKING]: useSvgFactory(getWalking, {...directionParams, fillAccent: color}),
      [CYCLING]: useSvgFactory(getCycling, {...directionParams, fillAccent: color}),
      [DRIVING]: useSvgFactory(getDriving, {...directionParams, fillAccent: color}),
      ['']: null,
    }[type]);
  return ModeCall(mode);
};

export default SelectDirection;
