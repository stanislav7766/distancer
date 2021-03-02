import {makeAutoObservable} from 'mobx';
import {isEmptyString, isExist, isObject} from '~/utils/validation/helpers';
import {storesDI} from '~/utils/store-di';

const DEFAULT_TRANSITION_PROPS = {
  animation: 'bottom',
  duration: 400,
};
const DEFAULT_POP = {
  transitionProps: DEFAULT_TRANSITION_PROPS,
};
const DEFAULT_PUSH = {
  screenId: '',
  screenProps: {},
  transitionProps: DEFAULT_TRANSITION_PROPS,
};
export class NavigationStore {
  constructor() {
    makeAutoObservable(this);
  }

  navigation = null;
  currentScreenId = '';

  setNavigation = navigation => {
    this.navigation = navigation;
  };
  onStackUpdate = (newStack, prevStack) => {
    const len = newStack.length;
    this.setCurrentScreenId(newStack[len - 1].screen);
  };

  setCurrentScreenId = screenId => {
    const newScreenId = screenId ?? this.navigation.stack[this.navigation.stack.length - 1].screen;
    if (newScreenId === this.currentScreenId) return;
    this.currentScreenId = newScreenId;
  };

  pushScreen = async ({screenId = '', screenProps = {}, transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_PUSH) => {
    this._validPush({screenId, screenProps, transitionProps}) &&
      (await this.navigation.push(screenId, screenProps, transitionProps));
  };
  popToMainScreen = async ({transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_POP) => {
    this._validPopToMain({transitionProps}) &&
      (await this.navigation.popTo(this.navigation.stack[0].id, transitionProps));
  };
  resetScreen = async ({
    screenId = '',
    screenProps = {},
    transitionProps = DEFAULT_TRANSITION_PROPS,
  } = DEFAULT_PUSH) => {
    this._validPush({transitionProps, screenId, screenProps}) &&
      (await this.navigation.reset(screenId, screenProps, transitionProps));
  };
  popScreen = async ({transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_POP) => {
    this._validPop({transitionProps}) && (await this.navigation.pop(transitionProps));
  };

  _validPush = ({screenId, screenProps, transitionProps}) => {
    return isExist(this.navigation) && !isEmptyString(screenId) && isObject(screenProps) && isObject(transitionProps);
  };

  _validPopToMain = ({transitionProps}) => {
    return isExist(this.navigation) && isObject(transitionProps);
  };

  _validPop = ({transitionProps}) => {
    return isExist(this.navigation) && isObject(transitionProps);
  };
}
storesDI.Injectable('navigationStore')(NavigationStore);

export const useNavigation = () => storesDI.Inject('navigationStore');
