import React from 'react';
import {CircleLayer, ShapeSource} from '@react-native-mapbox-gl/maps';
import {randomID} from '~/utils/random-id';
import {mainPoint, redPoint, greenPoint} from '~/constants/styles';
import {makeShape} from '~/utils/make-shape';

const circleDefaultProps = {};

const Bounds = ({start, end, allowLevelLimit}) => {
  const circleProps = {...circleDefaultProps, ...(allowLevelLimit ? {maxZoomLevel: 15} : {})};

  const renderBound = ({coordinate, type}) => {
    const boundStyle = type === 'first' ? redPoint : greenPoint;
    return (
      <ShapeSource id={`${randomID()}`} shape={makeShape('Point', coordinate)}>
        <CircleLayer {...circleProps} id={`${randomID()}`} style={mainPoint} />
        <CircleLayer {...circleProps} id={`${randomID()}`} style={boundStyle} />
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
