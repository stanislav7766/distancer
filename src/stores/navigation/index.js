import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {isEmptyString, isExist, isObject} from '~/utils/validation/helpers';

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

  setNavigation = navigation => {
    this.navigation = navigation;
  };
  pushScreen = ({screenId = '', screenProps = {}, transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_PUSH) => {
    this._validPush({screenId, screenProps, transitionProps}) &&
      this.navigation.push(screenId, screenProps, transitionProps);
  };
  popToMainScreen = ({transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_POP) => {
    this._validPopToMain({transitionProps}) && this.navigation.popTo(this.navigation.stack[0].id, transitionProps);
  };
  resetScreen = ({screenId = '', screenProps = {}, transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_PUSH) => {
    this._validPush({transitionProps, screenId, screenProps}) &&
      this.navigation.reset(screenId, screenProps, transitionProps);
  };
  popScreen = ({transitionProps = DEFAULT_TRANSITION_PROPS} = DEFAULT_POP) => {
    this._validPop({transitionProps}) && this.navigation.pop(transitionProps);
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

export const NavigationContext = createContext();
export const useNavigation = () => useContext(NavigationContext);
