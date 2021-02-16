export const buildItemString = ({date, distance, pace, movingTime, avgSpeed}, isRun) =>
  `${date}\n ${distance} km     ${isRun ? `${pace} /km` : `${avgSpeed}km/h`}      ${movingTime}`;

export const buildRunString = ({monthCount, monthDistance, monthAvgPace}) =>
  `${monthCount} runs    ${monthDistance} km   ${monthAvgPace} /km`;
export const buildActivityString = ({monthCount, monthDistance, monthAvgSpeed}) =>
  `${monthCount} activities    ${monthDistance} km   ${monthAvgSpeed} km/h`;
