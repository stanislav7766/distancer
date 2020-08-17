import React, {useContext, useMemo, Fragment} from 'react';
import {liveRouteContext} from '../../contexts/contexts';
// import DotLine from './DotLine';
import {randomID} from '../../utils/randomID';
import {Animated, LineLayer, ShapeSource} from '@react-native-mapbox-gl/maps';
import {isFilledArr} from '../../utils/isFilledArr';
import {lineStyle} from '../../constants/styles';

const LiveRoute = () => {
  const {liveRoute} = useContext(liveRouteContext);
  const {points1} = liveRoute;
  // const chunks = splitted(points, points.length > 25 ? Math.floor(points.length / 10) : 5);

  const Line = useMemo(
    () => (
      <ShapeSource id={`${randomID()}`} shape={makeShape('LineString', points1)}>
        <LineLayer id={`${randomID()}`} style={lineStyle} />
      </ShapeSource>
    ),
    [points1],
  );

  return <Fragment>{isFilledArr(points1) && Line}</Fragment>;
};
export default LiveRoute;

// const splitted = (arr, length) => {
//   const result = [];
//   for (let i = 0; i < arr.length; i += length - 1) {
//     const chunk = arr.slice(i, i + length);
//     result.push(chunk);
//   }
//   return result;
// };
const makeShape = (type, coordinates) =>
  new Animated.Shape({
    type,
    coordinates,
  });
