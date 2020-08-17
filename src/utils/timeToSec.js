export const timeToSec = hhmmss =>
  Number(
    hhmmss
      .split(':')
      .reverse()
      .reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0),
  );

export const kmToM = km => km * 1000;
const pad = n =>
  String(n)
    .padStart(2, '0')
    .substring(0, 2);

export const msTohhmmss = ms => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return [pad(hours.toString(), 2), pad(minutes.toString(), 2), pad(seconds.toString(), 2)].join(':');
};
