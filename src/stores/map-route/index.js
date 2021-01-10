import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {isFilledArr} from '../../utils/isFilledArr';
import {randomID} from '../../utils/randomID';
import {isEqualArr} from '../../utils/isEqualArr';

const getDiff = (arr1, arr2) => arr2.filter(val => !arr1.some(val2 => JSON.stringify(val) === JSON.stringify(val2)));

const getSingleDiffIndex = (arr1, arr2) =>
  arr1.findIndex(val => !arr2.some(val2 => JSON.stringify(val) === JSON.stringify(val2)));
const getIndexById = (arr, id) => arr.findIndex(val => val.id === id);

const isPush = (o, n) => n.length === o.length + 1 && isEqualArr(o, n.slice(0, n.length - 1));
const isPop = (o, n) => n.length + 1 === o.length && isEqualArr(n, o.slice(0, o.length - 1));
const isDrag = (o, n) => o.length === n.length && !isEqualArr(n, o) && getDiff(o, n).length === 1;
const isFunction = f => typeof f === 'function';
const isMultiplePush = (o, n) => n.length > o.length && isEqualArr(o, n.slice(0, o.length));

const mapper = arr => arr.map(val => ({id: randomID(), coordinate: val}));

export class MapRouteStore {
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
    const [coordinate] = newCoords.slice(-1);
    this.mappedCoords.push({id: randomID(), coordinate});
    this.coords.push(coordinate);
  };
  _multiplePush = newCoords => {
    const tail = newCoords.slice(this.coords.length, newCoords.length);
    const mappedTail = mapper(tail);
    this.mappedCoords = [...this.mappedCoords, ...mappedTail];
    this.coords = [...this.coords, ...tail];
  };
  _pop = () => {
    this.mappedCoords.pop();
    this.coords.pop();
  };
  _drag = coords => {
    const index = getSingleDiffIndex(this.coords, coords);
    if (index < 0) return;
    const coordinate = coords[index];
    this.coords[index] = coordinate;
    this.mappedCoords[index] = {id: randomID(), coordinate};
  };
  _remove = id => {
    const index = getIndexById(this.mappedCoords, id);
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
    if (!isFilledArr(newCoords)) {
      return 'init';
    } else if (isEqualArr(this.coords, newCoords)) {
      return;
    } else if (isPush(this.coords, newCoords)) {
      return 'push';
    } else if (isMultiplePush(this.coords, newCoords)) {
      return 'multiple-push';
    } else if (isPop(this.coords, newCoords)) {
      return 'pop';
    } else if (isDrag(this.coords, newCoords)) {
      return 'drag';
    }
  };

  setCoords = coords => {
    const op = this._detectOperation(coords);
    this._execute(op, {coords});
  };
  getCoordIndexById = id => {
    return getIndexById(this.mappedCoords, id);
  };
}

export const MapRouteContext = createContext();
export const useMapRoute = () => useContext(MapRouteContext);
