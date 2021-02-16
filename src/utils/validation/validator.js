import {WEAK_PASSWORD, INVALID_EMAIL, WRONG_AGE} from '~/constants/constants';
import {isEmail, isEmpty, isLength, isNumLength, isNumber} from './helpers';
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

export const validateFields = fields =>
  Object.keys(fields).reduce((accum, prop) => {
    const res = validateProp(prop, fields[prop]);
    return res ? {...accum, [prop]: res} : accum;
  }, {});
