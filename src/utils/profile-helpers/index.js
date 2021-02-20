import {PART_KEY_FILLED_PROFILE} from '~/constants/constants';
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

export const getProfileFilledKey = userId => `${userId}${PART_KEY_FILLED_PROFILE}`;
