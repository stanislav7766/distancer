import {isExist} from '../validation/helpers';

export const mapForDBProfile = ({age, height, weight, ...profile}) => ({
  ...profile,
  age: +age,
  weight: +weight,
  height: +height,
});

export const mapForStoreProfile = ({age, height, weight, ...profile}) => ({
  ...profile,
  age: isExist(age) ? `${age}` : '',
  weight: isExist(weight) ? `${weight}` : '',
  height: isExist(height) ? `${height}` : '',
});
