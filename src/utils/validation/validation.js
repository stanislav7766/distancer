import {isEmpty, validateFields} from './validator';

export const validateData = fields => {
  const errors = validateFields(fields);
  const reason = Object.keys(errors).length === 0 ? '' : Object.values(errors)[0];
  return {reason, isValid: isEmpty(errors)};
};
