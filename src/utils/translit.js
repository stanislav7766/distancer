import {chars} from '../constants/constants';

export const toLatin = (str, res = []) => {
  str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for (let i = 0; i < str.length; ++i) {
    res.push(
      chars[str[i]] ||
        (chars[str[i].toLowerCase()] === undefined && str[i]) ||
        chars[str[i].toLowerCase()].replace(/^(.)/, match => match.toUpperCase()),
    );
  }

  return res.join('');
};
