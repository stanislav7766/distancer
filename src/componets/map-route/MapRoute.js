import React, {useContext, useMemo, Fragment} from 'react';
import {modalContext, routeContext} from '../../contexts/contexts';
import DotLine from './DotLine';
import {isFilledArr} from '../../utils/isFilledArr';
import {isEqualArr} from '../../utils/isEqualArr';

const MapRoute = () => {
  const {dragMode} = useContext(modalContext);
  const {setCurrentRoute, currentRoute} = useContext(routeContext);
  const {points} = currentRoute;
  let index;
  const chunks = splitted(points, points.length > 25 ? Math.floor(points.length / 10) : 5);

  const onDragStart = ({geometry}) => {
    const {coordinates} = geometry;
    for (let i = 0; i < points.length; i++) {
      if (isEqualArr(points[i], coordinates)) {
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

  const MapDotLine = useMemo(
    () => (
      <Fragment>
        {chunks.map((chunk, i) => (
          <DotLine
            start={points[0]}
            end={points.slice(-1)[0]}
            key={i}
            dragMode={dragMode}
            chunkCoords={chunk}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points, dragMode],
  );

  return <Fragment>{isFilledArr(chunks) && MapDotLine}</Fragment>;
};
export default MapRoute;

const splitted = (arr, length) => {
  const result = [];
  for (let i = 0; i < arr.length; i += length - 1) {
    const chunk = arr.slice(i, i + length);
    result.push(chunk);
  }
  return result;
};
