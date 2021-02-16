export const fromLatLngToPoint = lnglat => {
  const TILE_SIZE = 256;
  const [lng, lat] = lnglat;
  const siny = Math.min(Math.max(Math.sin((lat * Math.PI) / 180), -0.9999), 0.9999);
  return {
    x: TILE_SIZE * (0.5 + lng / 360),
    y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)),
  };
};

export const getPointsDimenssions = worldPoints => {
  const mins = worldPoints.reduce(
    (accum, p) => ({
      minX: Math.min(p.x, accum.minX || p.x),
      minY: Math.min(p.y, accum.minY || p.y),
      maxX: Math.max(p.x, accum.maxX || p.x),
      maxY: Math.max(p.y, accum.maxY || p.y),
    }),
    {},
  );

  return {
    width: mins.maxX - mins.minX,
    height: mins.maxY - mins.minY,
    centerX: (mins.maxX + mins.minX) / 2,
    centerY: (mins.maxY + mins.minY) / 2,
  };
};
