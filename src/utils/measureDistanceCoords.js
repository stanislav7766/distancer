const toRad = value => (value * Math.PI) / 180;

const calcCrow = (lon1, lat1, lon2, lat2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const measureDistance = points => {
  if (points.length <= 1) {
    return 0;
  }
  const distance = points.reduce((accum, point, i) => {
    i < points.length - 1 && (accum += calcCrow(point[0], point[1], points[i + 1][0], points[i + 1][1]));
    return accum;
  }, 0);
  return distance.toFixed(2);
};
