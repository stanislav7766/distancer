import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {DEFAULT_ROUTES} from '~/constants/constants';
import {findIndexByKey, filterByIndex, uniquifyByKey} from '~/utils/common-helpers/arr-helpers';

export class RoutesStore {
  constructor() {
    makeAutoObservable(this);
  }

  routes = DEFAULT_ROUTES;
  nextKey = 0;

  setRoutes = routes => {
    this.routes = routes;
  };
  concatRoutes = routes => {
    this.routes = uniquifyByKey([...this.routes, ...routes], 'id');
  };
  setNextKey = nextKey => {
    this.nextKey = nextKey;
  };
  removeById = id => {
    const index = findIndexByKey(this.routes, 'id', id);
    if (index < 0) return;
    this.routes = filterByIndex(this.routes, index);
  };
  setDefaultRoutes = () => {
    this.routes = DEFAULT_ROUTES;
  };
}

export const RoutesContext = createContext();
export const useRoutes = () => useContext(RoutesContext);
