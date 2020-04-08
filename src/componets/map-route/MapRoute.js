import React, {useContext, Fragment, useMemo} from 'react';
import {View} from 'react-native';
import {modalContext, routeContext} from '../../contexts/contexts';
import {
  Animated as AnimatedM,
  LineLayer,
  ShapeSource,
  PointAnnotation,
  CircleLayer,
} from '@react-native-mapbox-gl/maps';
import {randomID} from '../../utils/randomID';
import {isEmptyArr} from '../../utils/isEmptyArr';

const ANNOTATION_SIZE = 14;
const ACCENT_GREEN = '#65FF4B';
const ACCENT_RED = '#FF6868';
const ACCENT_BLUE = '#00C2FF';

const makeShape = (type, coordinates) =>
  new AnimatedM.Shape({
    type,
    coordinates,
  });

const MapRoute = () => {
  const {dragMode} = useContext(modalContext);
  const {setCurrentRoute, currentRoute} = useContext(routeContext);
  const {points} = currentRoute;
  const isFirstPoint = i => i === 0;
  const isLastPoint = i => points && i === points.length - 1;
  let index;

  const onDragStart = ({geometry}) => {
    const {coordinates} = geometry;
    for (let i = 0; i < points.length; i++) {
      if (JSON.stringify(points[i]) === JSON.stringify(coordinates)) {
        index = i;
        break;
      }
    }
  };

  const onDragEnd = ({geometry}) => {
    const {coordinates} = geometry;
    const nPoints = [...points];
    nPoints[index] = coordinates;
    setCurrentRoute({...currentRoute, points: nPoints});
  };

  const Dots = useMemo(
    () => (
      <Fragment>
        {points.map((point, i) =>
          dragMode ? (
            <PointAnnotation
              key={i}
              id={`${randomID()}`}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              draggable={true}
              coordinate={point}
            >
              <View style={isFirstPoint(i) || isLastPoint(i) ? annotationStyle : annotationSmallStyle} />
            </PointAnnotation>
          ) : (
            <ShapeSource key={i} id={`${randomID()}`} shape={makeShape('Point', point)}>
              <CircleLayer
                id={`${randomID()}`}
                style={isFirstPoint(i) || isLastPoint(i) ? mainPoint : mainPointSmall}
              />
              {isFirstPoint(i) && <CircleLayer id={`${randomID()}`} style={redPoint} />}
              {isLastPoint(i) && <CircleLayer id={`${randomID()}`} style={greenPoint} />}
            </ShapeSource>
          ),
        )}
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points, dragMode],
  );

  const Line = useMemo(
    () => (
      <ShapeSource id={`${randomID()}`} shape={makeShape('LineString', points)}>
        <LineLayer id={`${randomID()}`} style={lineStyle} />
      </ShapeSource>
    ),
    [points],
  );

  return (
    <Fragment>
      {isEmptyArr(points) && Line}
      {isEmptyArr(points) && Dots}
    </Fragment>
  );
};
export default MapRoute;

const lineStyle = {
  lineCap: 'round',
  lineWidth: 6,
  lineOpacity: 1,
  lineColor: ACCENT_BLUE,
};
const mainPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_BLUE,
  circleRadius: 20 / 2,
};
const mainPointSmall = {
  circleOpacity: 1,
  circleColor: ACCENT_BLUE,
  circleRadius: ANNOTATION_SIZE / 2,
};
const redPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_RED,
  circleRadius: 20 / 2 - 3,
};
const greenPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_GREEN,
  circleRadius: 20 / 2 - 3,
};

const annotationStyle = {
  width: 20,
  height: 20,
  backgroundColor: ACCENT_BLUE,
  borderRadius: 20 / 2,
};
const annotationSmallStyle = {
  width: ANNOTATION_SIZE,
  height: ANNOTATION_SIZE,
  backgroundColor: ACCENT_BLUE,
  borderRadius: ANNOTATION_SIZE / 2,
};
