const defaultDesignation = {
  km: 'km',
  perKM: '/km',
  kmPerH: 'km/h',
  runs: 'runs',
  activities: 'activities',
};
export const buildItemString = (
  {date, distance, pace, movingTime, avgSpeed},
  isRun,
  designation = defaultDesignation,
) =>
  `${date}\n ${distance} ${designation.km}     ${
    isRun ? `${pace} ${designation.perKM}` : `${avgSpeed}${designation.kmPerH}`
  }      ${movingTime}`;

export const buildRunString = ({monthCount, monthDistance, monthAvgPace}, designation = defaultDesignation) =>
  `${monthCount} ${designation.runs}    ${monthDistance} ${designation.km}   ${monthAvgPace} ${designation.perKM}`;
export const buildActivityString = ({monthCount, monthDistance, monthAvgSpeed}, designation = defaultDesignation) =>
  `${monthCount} ${designation.activities}    ${monthDistance} ${designation.km}   ${monthAvgSpeed} ${designation.kmPerH}`;
