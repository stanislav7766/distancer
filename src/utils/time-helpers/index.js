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
