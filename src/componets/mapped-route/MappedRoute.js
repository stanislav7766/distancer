import React, {useEffect, useState, useRef} from 'react';
import Line from './map-elements/Line';
import DragDot from './map-elements/DragDot';
import Dot from './map-elements/Dot';
import Bounds from './map-elements/Bounds';
import {useLocationPosition} from '~/hooks/use-location-position';
import {useMappedRoute} from '~/stores/mapped-route';
import {useRouteSettings} from '~/stores/route-settings';
import {useAppMode} from '~/stores/app-mode';
import {useMap} from '~/stores/map';
import {useCurrentRoute} from '~/stores/current-route';
import Toast from 'react-native-simple-toast';
import {isEmpty, isFilledArr} from '~/utils/validation/helpers';
import {APP_MODE} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {getBounds} from '~/utils/common-helpers/arr-helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const MappedRoute = () => {
  const [dragCoord, setDragCoord] = useState(null);
  const {cameraRef} = useMap();
  const dragCoordIndexRef = useRef(-1);
  const {moveCamera} = useLocationPosition(cameraRef);
  const {dragHints} = useRouteSettings();
  const {mappedCoords, setCoords, getCoordIndexById} = useMappedRoute();
  const {setPoints, currentRoute} = useCurrentRoute();
  const {points} = currentRoute;
  const {liveWithRoute, dragMode, appMode} = useAppMode();
  const dragModeRef = useRef(dragMode);

  const [first, last] = getBounds(points);

  useEffect(() => {
    setCoords(points);
  }, [points, setCoords]);

  const isDrawMode = appMode === APP_MODE.DRAW_MODE;
  const showBounds = !isEmpty(first) && !isEmpty(last);
  const showDragDot = isDrawMode && !isEmpty(dragCoord?.coordinate);
  const showDot = isDrawMode && isFilledArr(mappedCoords) && !liveWithRoute;
  const showLine = isFilledArr(points);
  const isDottedLine = liveWithRoute;

  useEffect(() => {
    dragMode !== dragModeRef.current && (dragModeRef.current = dragMode);
  }, [dragMode]);

  const onDragStart = (_, id) => {
    dragCoordIndexRef.current = getCoordIndexById(id);
  };

  const onDragEnd = ({geometry}) => {
    if (dragCoordIndexRef?.current < 0) return;
    const {coordinates} = geometry;
    const nPoints = [...points];
    nPoints[dragCoordIndexRef.current] = coordinates;
    setPoints(nPoints);
    setDragCoord(null);
  };

  const onPress = coord => {
    if (!dragModeRef.current) {
      dragHints && Toast.show(papyrusify('drawMode.message.noInDragMode'));
      return;
    }
    dragHints && Toast.show(papyrusify('drawMode.message.dragPointNow'));
    moveCamera({zoomLevel: 16, centerCoordinate: coord.coordinate});
    setDragCoord(coord);
  };

  const renderDot = item => item.id !== dragCoord?.id && <Dot key={item.id} onPress={onPress} coord={item} />;

  const MappedLine = showLine && <Line dottedLine={isDottedLine} coordinates={points} smooth={false} />;
  const MappedBounds = showBounds && <Bounds allowLevelLimit={isDrawMode} start={first} end={last} />;
  const MappedDot = showDot && mappedCoords.map(renderDot);
  const MappedDragDot = showDragDot && <DragDot onDragEnd={onDragEnd} onDragStart={onDragStart} coord={dragCoord} />;
  return (
    <>
      {MappedDragDot}
      {MappedDot}
      {MappedLine}
      {MappedBounds}
    </>
  );
};
export default observer(MappedRoute);
