import {WEAK_PASSWORD, INVALID_EMAIL, WRONG_AGE} from '../../constants/constants';
const FIELD_REQUIRED = field => `The ${field} is required`;

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'function' && value.length === 0) ||
  (value instanceof Error && value.message === '');

const isNumber = text => !isNaN(text) && /^[-]?\d+$/.test(text);
const isEmail = email =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
const isLength = (text, {min, max = Number.MAX_SAFE_INTEGER}) => text.length >= min && text.length <= max;

const validateProp = (prop, value) =>
  ({
    email: (!isEmail(value) && INVALID_EMAIL) || '',
    password: (isEmpty(value) && FIELD_REQUIRED('Password')) || (!isLength(value, {min: 6}) && WEAK_PASSWORD) || '',
    firstName: (isEmpty(value) && FIELD_REQUIRED('First name')) || '',
    lastName: (isEmpty(value) && FIELD_REQUIRED('Last name')) || '',
    age: (!isNumber(value) && WRONG_AGE) || '',
    gender: (isEmpty(value) && FIELD_REQUIRED('Gender')) || '',
    weight: (isEmpty(value) && FIELD_REQUIRED('Weight')) || '',
    height: (isEmpty(value) && FIELD_REQUIRED('Height')) || '',
  }[prop]);

export const validateFields = fields =>
  Object.keys(fields).reduce((accum, prop) => {
    const res = validateProp(prop, fields[prop]);
    return res ? {...accum, [prop]: res} : accum;
  }, {});
