import useSvgFactory from '~/hooks/use-svg-factory';
import {getCancel} from '~/assets/svg-icons/cancel';
import {getActionsMenu} from '~/assets/svg-icons/actions-menu';
import {getBin} from '~/assets/svg-icons/bin';
import {MULTIPLE_SELECT_MODE} from '~/constants/constants';

const binParams = {
  width: 20,
  height: 20,
};
const actionsMenuParams = {
  width: 4,
  height: 18,
};
const cancelParams = {
  width: 30,
  height: 25,
};

const {DELETE, CANCEL, MENU} = MULTIPLE_SELECT_MODE;

export const SelectAction = ({mode, color}) => {
  const ModeCall = type =>
    ({
      [DELETE]: useSvgFactory(getBin, {...binParams, fillAccent: color}),
      [CANCEL]: useSvgFactory(getCancel, {...cancelParams, fillAccent: color}),
      [MENU]: useSvgFactory(getActionsMenu, {...actionsMenuParams, fillAccent: color}),
      ['']: null,
    }[type]);
  return ModeCall(mode);
};
