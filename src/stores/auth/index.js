import {makeAutoObservable} from 'mobx';
import {DEFAULT_PROFILE} from '~/constants/constants';
import {storesDI} from '~/utils/store-di';

export class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  profile = DEFAULT_PROFILE;
  authorized = false;

  setAuthorized = authorized => {
    this.authorized = authorized;
    !authorized && this.setProfile(DEFAULT_PROFILE);
  };
  setProfile = profile => {
    this.profile = {...this.profile, ...profile};
  };
}
storesDI.Injectable('authStore')(AuthStore);

export const useAuth = () => storesDI.Inject('authStore');
