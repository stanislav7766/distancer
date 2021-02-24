import {WEAK_PASSWORD, INVALID_EMAIL, WRONG_AGE} from '~/constants/constants';
import {isEmail, isEmpty, isLength, isNumLength, isNumber, isAvgPace, ishhmmss, isAvgSpeed} from './helpers';
isEmpty;
const FIELD_REQUIRED = field => `The ${field} is required`;

const validateProp = (prop, value) =>
  ({
    email: (!isEmail(value) && INVALID_EMAIL) || '',
    password: (isEmpty(value) && FIELD_REQUIRED('Password')) || (!isLength(value, {min: 6}) && WEAK_PASSWORD) || '',
    firstName: (isEmpty(value) && FIELD_REQUIRED('First name')) || '',
    lastName: (isEmpty(value) && FIELD_REQUIRED('Last name')) || '',
    age: ((!isNumber(value) || !isNumLength(+value, {min: 1, max: 130})) && WRONG_AGE) || '',
    gender: (isEmpty(value) && FIELD_REQUIRED('Gender')) || '',
    weight: (isEmpty(value) && FIELD_REQUIRED('Weight')) || '',
    height: (isEmpty(value) && FIELD_REQUIRED('Height')) || '',
  }[prop]);

const validateActivityProp = (prop, value) =>
  ({
    distance: (!isAvgSpeed(value) && 0) || value,
    pace: (!isAvgPace(value) && '0\'0"') || value,
    movingTime: (!ishhmmss(value) && '00:00:00') || value,
    totalTime: (!ishhmmss(value) && '00:00:00') || value,
    avgSpeed: (!isAvgSpeed(value) && 0) || value,
  }[prop]);

export const validateFields = fields =>
  Object.keys(fields).reduce((accum, prop) => {
    const res = validateProp(prop, fields[prop]);
    return res ? {...accum, [prop]: res} : accum;
  }, {});

export const validateActivityFields = fields =>
  Object.keys(fields).reduce((accum, prop) => {
    const res = validateActivityProp(prop, fields[prop]);
    return res ? {...accum, [prop]: res} : {...accum, [prop]: fields[prop]};
  }, {});
