import {validateFields} from './validator';
import {isFilledObj} from './helpers';

export const validateData = fields => {
  const errors = validateFields(fields);
  const reason = !isFilledObj(errors) ? '' : Object.values(errors)[0];
  return {reason, isValid: !isFilledObj(errors)};
};
