import {makeAutoObservable} from 'mobx';
import {isEqualJson, isFilledArr, isFunction} from '~/utils/validation/helpers';
import {getIndexSingleDiff, findIndexByKey, getLastItem} from '~/utils/common-helpers/arr-helpers';
import {
  isDragged,
  isMultiplePushed,
  isPopped,
  isPushed,
  mapperWithNewId,
  coordinateWithNewId,
} from '~/utils/route-helpers';
import {storesDI} from '~/utils/store-di';

export class MappedRouteStore {
  constructor() {
    makeAutoObservable(this);
  }
  mappedCoords = [];
  coords = [];

  _init = () => {
    this.mappedCoords = [];
    this.coords = [];
  };
  _push = newCoords => {
    const coordinate = getLastItem(newCoords);
    this.mappedCoords.push(coordinateWithNewId(coordinate));
    this.coords.push(coordinate);
  };
  _multiplePush = newCoords => {
    const tail = newCoords.slice(this.coords.length, newCoords.length);
    const mappedTail = mapperWithNewId(tail);
    this.mappedCoords = [...this.mappedCoords, ...mappedTail];
    this.coords = [...this.coords, ...tail];
  };
  _pop = () => {
    this.mappedCoords.pop();
    this.coords.pop();
  };
  _drag = coords => {
    const index = getIndexSingleDiff(this.coords, coords);
    if (index < 0) return;
    const coordinate = coords[index];
    this.coords[index] = coordinate;
    this.mappedCoords[index] = coordinateWithNewId(coordinate);
  };
  _remove = id => {
    const index = findIndexByKey(this.mappedCoords, 'id', id);
    if (index < 0) return;
    this.coords.splice(index, 1);
    this.mappedCoords.splice(index, 1);
  };

  _execute = (op, {id, coords}) => {
    const executer = {
      init: this._init.bind(null),
      push: this._push.bind(null, coords),
      pop: this._pop.bind(null),
      drag: this._drag.bind(null, coords),
      remove: this._remove.bind(null, id),
      'multiple-push': this._multiplePush.bind(null, coords),
    }[op];
    isFunction(executer) && executer();
  };

  _detectOperation = newCoords => {
    if (!isFilledArr(newCoords)) return 'init';
    else if (isEqualJson(this.coords, newCoords)) return '';
    else if (isPushed(this.coords, newCoords)) return 'push';
    else if (isMultiplePushed(this.coords, newCoords)) return 'multiple-push';
    else if (isPopped(this.coords, newCoords)) return 'pop';
    else if (isDragged(this.coords, newCoords)) return 'drag';
  };

  setCoords = coords => {
    const op = this._detectOperation(coords);
    this._execute(op, {coords});
  };
  getCoordIndexById = id => {
    return findIndexByKey(this.mappedCoords, 'id', id);
  };
}

export const useMappedRoute = () => storesDI.Inject('mappedRouteStore');
