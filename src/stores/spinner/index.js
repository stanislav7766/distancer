import {makeAutoObservable} from 'mobx';
import {storesDI} from '~/utils/store-di';

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
storesDI.Injectable('spinnerStore')(SpinnerStore);

export const useSpinner = () => storesDI.Inject('spinnerStore');
