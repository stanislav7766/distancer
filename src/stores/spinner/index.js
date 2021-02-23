import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

export class SpinnerStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  isMoreLoading = false;

  loadingPosition = 'bottom';
  moreLoadingPosition = 'bottom';

  showLoading = true;
  showMoreLoading = true;

  startLoading = ({position = 'bottom', show = true} = {position: 'bottom', show: true}) => {
    this.loadingPosition = position;
    this.showLoading = show;

    this.isLoading = true;
  };
  startMoreLoading = ({position = 'bottom', show = true} = {position: 'bottom', show: true}) => {
    this.moreLoadingPosition = position;
    this.showMoreLoading = show;

    this.isMoreLoading = true;
  };
  stopLoading = () => {
    this.isLoading = false;
  };
  stopMoreLoading = () => {
    this.isMoreLoading = false;
  };
}

export const SpinnerContext = createContext();
export const useSpinner = () => useContext(SpinnerContext);
