export const timeToSec = hhmmss =>
  Number(
    hhmmss
      .split(':')
      .reverse()
      .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0),
  );

export const kmToM = km => km * 1000;
const pad = n => String(n).padStart(2, '0').substring(0, 2);

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

export const calcPace = (dist, time) => {
  const splitedTime = time.split(':');
  const distance = parseFloat(dist);
  if (distance === 0) return `0'0"`;
  const hrs = splitedTime.length === 3 ? parseFloat(splitedTime[0]) : 0;
  const mins = parseFloat(splitedTime.length === 3 ? splitedTime[1] : splitedTime[0]);
  const secs = parseFloat(splitedTime.length === 3 ? splitedTime[2] : splitedTime[1]);
  const timeElapsed = hrs * 60 * 60 + mins * 60 + secs;
  const paceMins = Math.floor(Math.floor(timeElapsed / distance) / 60);
  const paceSecs = Math.floor(timeElapsed / distance) - paceMins * 60;
  return `${paceMins}'${paceSecs}"`;
};
export const hhmmssSum = (hhmmss1, hhmmss2) => {
  const ms1 = timeToSec(hhmmss1) * 1000;
  const ms2 = timeToSec(hhmmss2) * 1000;
  return msTohhmmss(ms1 + ms2);
};
