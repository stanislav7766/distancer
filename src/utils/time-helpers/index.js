import {pipe} from '../common-helpers/fun-helpers';
import {pad} from './helps';

export const hhmmssToSec = hhmmss =>
  Number(
    hhmmss
      .split(':')
      .reverse()
      .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0),
  );

export const msTohhmmss = ms => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return [pad(hours.toString(), 2), pad(minutes.toString(), 2), pad(seconds.toString(), 2)].join(':');
};

export const secTohhmmss = sec => msTohhmmss(sec * 1000);

export const paceTommss = pace => pace.replace(/"/gi, '').split("'").join(':');
export const mmssTopace = mmss =>
  mmss
    .split(':')
    .map((val, ind) => `${parseInt(val, 10)}${ind === 0 ? "'" : '"'}`)
    .join('');

export const mmssTohhmmss = mmss => {
  const arr = mmss.split(':');
  if (arr.length === 3) return mmss;
  return `00:${mmss}`;
};
export const hhmmssTommss = hhmmss => {
  const arr = hhmmss.split(':');
  if (arr.length === 2) return hhmmss;
  const [, ...mmss] = arr;
  return mmss.join(':');
};

export const yyyymmddNow = () => {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  return todayUTC.toISOString().slice(0, 10).replace(/-/g, '/');
};

export const hhmmssSum = (hhmmss1, hhmmss2) => {
  const ms1 = hhmmssToSec(hhmmss1) * 1000;
  const ms2 = hhmmssToSec(hhmmss2) * 1000;
  return msTohhmmss(ms1 + ms2);
};

export const getTimestamp = () => Date.now();

export const secToPace = pipe(secTohhmmss, hhmmssTommss, mmssTopace);
export const paceToSec = pipe(paceTommss, mmssTohhmmss, hhmmssToSec);
