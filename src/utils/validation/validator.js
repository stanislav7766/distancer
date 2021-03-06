import {isEmail, isEmpty, isLength, isNumLength, isNumber, isAvgPace, ishhmmss, isNum} from './helpers';
isEmpty;
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const validateProp = (prop, value) =>
  ({
    email: (!isEmail(value) && papyrusify('validation.message.invalidEmail')) || '',
    password:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`sign.input.${prop}`))) ||
      (!isLength(value, {min: 6}) && papyrusify('validation.message.weakPassword')) ||
      '',
    firstName:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`editProfile.input.${prop}`))) ||
      '',
    lastName:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`editProfile.input.${prop}`))) ||
      '',
    age:
      ((!isNumber(value) || !isNumLength(+value, {min: 1, max: 130})) && papyrusify('validation.message.ageWrong')) ||
      '',
    gender:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`editProfile.input.${prop}`))) ||
      '',
    weight:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`editProfile.input.${prop}`))) ||
      '',
    height:
      (isEmpty(value) && papyrusify('validation.function.fieldRequired')(papyrusify(`editProfile.input.${prop}`))) ||
      '',
  }[prop]);

const validateActivityProp = (prop, value) =>
  ({
    distance: (!isNum(value) && 0) || value,
    pace: (!isAvgPace(value) && '0\'0"') || value,
    movingTime: (!ishhmmss(value) && '00:00:00') || value,
    totalTime: (!ishhmmss(value) && '00:00:00') || value,
    avgSpeed: (!isNum(value) && 0) || value,
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
