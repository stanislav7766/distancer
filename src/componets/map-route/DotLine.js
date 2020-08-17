import React, {useState, useEffect, Fragment, useMemo} from 'react';
import {View} from 'react-native';
import {Animated, LineLayer, CircleLayer, ShapeSource, PointAnnotation} from '@react-native-mapbox-gl/maps';
import {randomID} from '../../utils/randomID';
import {isFilledArr} from '../../utils/isFilledArr';
import {annotationStyle, mainPoint, redPoint, greenPoint, lineStyle} from '../../constants/styles';
import {isEqualArr} from '../../utils/isEqualArr';

const DotLine = ({chunkCoords, start, end, dragMode, onDragStart, onDragEnd, lineOnly}) => {
  const [cacheCoords, setCacheCoords] = useState([]);

  useEffect(() => {
    !isEqualArr(chunkCoords, cacheCoords) && setCacheCoords(chunkCoords);
  }, [chunkCoords, cacheCoords]);

  const Dots1 = useMemo(
    () => (
      <Fragment>
        {cacheCoords.map((point, i) =>
          dragMode ? (
            <PointAnnotation
              key={i}
              id={`${randomID()}`}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              draggable={true}
              coordinate={point}
            >
              <View style={annotationStyle} />
            </PointAnnotation>
          ) : (
            <Fragment key={i}>
              {isEqualArr(point, start) && (
                <ShapeSource id={`${randomID()}`} shape={makeShape('Point', start)}>
                  <CircleLayer id={`${randomID()}`} style={mainPoint} />
                  <CircleLayer id={`${randomID()}`} style={redPoint} />
                </ShapeSource>
              )}
              {isEqualArr(point, end) && (
                <ShapeSource id={`${randomID()}`} shape={makeShape('Point', end)}>
                  <CircleLayer id={`${randomID()}`} style={mainPoint} />
                  <CircleLayer id={`${randomID()}`} style={greenPoint} />
                </ShapeSource>
              )}
            </Fragment>
          ),
        )}
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cacheCoords, dragMode],
  );

  const Line = useMemo(
    () => (
      <ShapeSource id={`${randomID()}`} shape={makeShape('LineString', cacheCoords)}>
        <LineLayer id={`${randomID()}`} style={lineStyle} />
      </ShapeSource>
    ),
    [cacheCoords],
  );

  return (
    <Fragment>
      {isFilledArr(cacheCoords) && Line}
      {!lineOnly && isFilledArr(cacheCoords) && Dots1}
    </Fragment>
  );
};

export default DotLine;

const makeShape = (type, coordinates) =>
  new Animated.Shape({
    type,
    coordinates,
  });
