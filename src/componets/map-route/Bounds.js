import React from 'react';
import {CircleLayer, ShapeSource} from '@react-native-mapbox-gl/maps';
import {randomID} from '../../utils/randomID';
import {mainPoint, redPoint, greenPoint} from '../../constants/styles';
import {makeShape} from '../../utils/make-shape';

const Bounds = ({start, end}) => {
  const renderBound = ({coordinate, type}) => {
    const boundStyle = type === 'first' ? redPoint : greenPoint;
    return (
      <ShapeSource id={`${randomID()}`} shape={makeShape('Point', coordinate)}>
        <CircleLayer maxZoomLevel={15} id={`${randomID()}`} style={mainPoint} />
        <CircleLayer maxZoomLevel={15} id={`${randomID()}`} style={boundStyle} />
      </ShapeSource>
    );
  };

  const StartDot = renderBound({coordinate: start, type: 'first'});
  const EndDot = renderBound({coordinate: end, type: 'last'});

  return (
    <>
      {StartDot}
      {EndDot}
    </>
  );
};

export default Bounds;
