import {makeAutoObservable} from 'mobx';
import {DEFAULT_ROUTES} from '~/constants/constants';
import {findIndexByKey, filterByIndex, uniquifyByKey} from '~/utils/common-helpers/arr-helpers';
import {storesDI} from '~/utils/store-di';

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
  removeByIds = items => {
    const ids = items.map(({id}) => id);
    this.routes = this.routes.filter(route => !ids.includes(route.id));
  };
  setDefaultRoutes = () => {
    this.routes = DEFAULT_ROUTES;
  };
}

export const useRoutes = () => storesDI.Inject('routesStore');
