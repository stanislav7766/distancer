export const DEFAULT_MONTH_PROPS = {
  monthTime: '00:00:00',
  monthAvgSpeed: 0.0,
  monthAvgPace: '0\'0"',
  monthDistance: 0,
};

export const DEFAULT_PACE = '0\'0"';
export const DEFAULT_AVG_SPEED = 0.0;

export const sumNum = (first, second) => +first + +second;

export const mapMonth = {
  1: 'jan',
  2: 'feb',
  3: 'mar',
  4: 'apr',
  5: 'may',
  6: 'jun',
  7: 'jul',
  8: 'aug',
  9: 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec',
};

export const sortByDate = arr => arr.sort((a, b) => new Date(b.date) - new Date(a.date));
