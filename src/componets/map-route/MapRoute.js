import React, {useContext, useEffect, useState, useRef} from 'react';
import {mapContext} from '../../contexts/contexts';
import {modalContext, routeContext} from '../../contexts/contexts';
import Line from './Line';
import DragDot from './DragDot';
import Dot from './Dot';
import Bounds from './Bounds';
import {Groove} from '../../contexts/Groove';
import {useMapRoute} from '../../stores/map-route';
import {useRouteSettings} from '../../stores/route-settings';
import {isFilledArr} from '../../utils/isFilledArr';
import Toast from 'react-native-simple-toast';
import {isEmpty} from '../../utils/validation/validator';
import {NOT_IN_DRAG_MODE, DRAG_POINT_NOW} from '../../constants/constants';
import {observer} from 'mobx-react-lite';

const MapRoute = () => {
  const [dragCoord, setDragCoord] = useState(null);
  const {cameraRef} = useContext(mapContext);
  const {dragMode} = useContext(modalContext);
  const dragModeRef = useRef(dragMode);
  const dragCoordIndexRef = useRef(-1);
  const {moveCamera} = Groove(cameraRef);

  const {dragHints} = useRouteSettings();
  const {mappedCoords, setCoords, getCoordIndexById} = useMapRoute();
  const {setCurrentRoute, currentRoute} = useContext(routeContext);
  const {points, inLive} = currentRoute;

  const [first, last] = [points[0], points.slice(-1)[0]];

  useEffect(() => {
    setCoords(points);
  }, [points, setCoords]);

  const showBounds = !isEmpty(first) && !isEmpty(last);
  const showDragDot = !isEmpty(dragCoord?.coordinate);
  const showDot = isFilledArr(mappedCoords) && !inLive;
  const showLine = isFilledArr(points);
  const isDottedLine = inLive;

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
    setCurrentRoute({points: nPoints});
    setDragCoord(null);
  };

  const onPress = coord => {
    if (!dragModeRef.current) {
      dragHints && Toast.show(NOT_IN_DRAG_MODE);
      return;
    }
    dragHints && Toast.show(DRAG_POINT_NOW);
    moveCamera({zoomLevel: 16, centerCoordinate: coord.coordinate});
    setDragCoord(coord);
  };

  const renderItem = item => item.id !== dragCoord?.id && <Dot key={item.id} onPress={onPress} coord={item} />;

  const MappedLine = showLine && <Line dottedLine={isDottedLine} coordinates={points} smooth={false} />;
  const MappedBounds = showBounds && <Bounds start={first} end={last} />;
  const MappedDot = showDot && mappedCoords.map(renderItem);
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
export default observer(MapRoute);
