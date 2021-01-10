import React, {useContext} from 'react';
import {liveRouteContext} from '../../contexts/contexts';
import Line from './Line';
import {isFilledArr} from '../../utils/isFilledArr';

const LiveRoute = () => {
  const {liveRoute} = useContext(liveRouteContext);
  const {points1} = liveRoute;

  const showLine = isFilledArr(points1);

  const MappedLine = showLine && <Line dottedLine={false} coordinates={points1} smooth />;

  return <>{MappedLine}</>;
};
export default LiveRoute;
