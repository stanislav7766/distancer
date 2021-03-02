import {container} from './container';

export class DI {
  constructor(_container) {
    this._container = _container;
  }
  Injectable = token => target => {
    this._container.provide(token, new target());
  };
  Inject = token => this._container.resolve(token);
}

export const di = new DI(container);
