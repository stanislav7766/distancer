import React from 'react';
import Line from './map-elements/Line';
import {isFilledArr} from '~/utils/validation/helpers';
import {useLiveRoute} from '~/stores/live-route';
import {observer} from 'mobx-react-lite';

const LiveRoute = () => {
  const {liveRoute} = useLiveRoute();
  const {points1} = liveRoute;

  const showLine = isFilledArr(points1);

  const MappedLine = showLine && <Line dottedLine={false} coordinates={points1} smooth />;

  return <>{MappedLine}</>;
};
export default observer(LiveRoute);
