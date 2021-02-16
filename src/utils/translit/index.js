import {isExist} from '../validation/helpers';
import {chars} from './helps';

const mapChar = char => {
  const lower = char.toLowerCase();
  return chars[char] || (!isExist(chars[lower]) && char) || chars[lower].replace(/^(.)/, match => match.toUpperCase());
};

export const toLatin = str => {
  return str.replace(/[ъь]+/g, '').replace(/й/g, 'i').split('').map(mapChar).join('');
};
