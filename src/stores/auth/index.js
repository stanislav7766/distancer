import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_PROFILE} from '~/constants/constants';

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

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
