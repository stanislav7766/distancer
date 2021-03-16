import useSvgFactory from '~/hooks/use-svg-factory';
import {getSave} from '~/assets/svg-icons/save';
import {getContinue} from '~/assets/svg-icons/continue';
import {ACTIONS_MODE} from '~/constants/constants';

const actionParams = {
  width: 32,
  height: 32,
};

const {SAVE, CONTINUE} = ACTIONS_MODE;

export const SelectAction = ({mode, color}) => {
  const ModeCall = type =>
    ({
      [SAVE]: useSvgFactory(getSave, {...actionParams, fillAccent: color}),
      [CONTINUE]: useSvgFactory(getContinue, {...actionParams, fillAccent: color}),
      ['']: null,
    }[type]);
  return ModeCall(mode);
};
