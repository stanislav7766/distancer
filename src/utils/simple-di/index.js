import {isClass} from '../validation/helpers';
import {container} from './container';

export class DI {
  constructor(_container) {
    this._container = _container;
  }
  Injectable = token => target => {
    this._container.provide(token, isClass(target) ? new target() : target);
  };
  Inject = token => this._container.resolve(token);
}

export const di = new DI(container);
