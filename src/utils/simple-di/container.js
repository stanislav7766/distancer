export class Container {
  _providers = new Map();

  resolve(token) {
    if (!this._providers.has(token)) throw new Error(`No provider found for ${token}!`);

    return this._providers.get(token);
  }
  provide(token, value) {
    this._providers.set(token, value);
  }
}

export class Containers {
  _containers = new Map();

  get(token) {
    if (!this._containers.has(token)) throw new Error(`No container found for ${token}!`);

    return this._containers.get(token);
  }
  factory(token) {
    const container = new Container();
    this._containers.set(token, container);
    return container;
  }
}
export const containers = new Containers();
export const container = new Container();
