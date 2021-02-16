import React from 'react';
import {LineLayer, ShapeSource} from '@react-native-mapbox-gl/maps';
import {randomID} from '~/utils/random-id';
import {default as bezierSpline} from '@turf/bezier-spline';
import * as helpers from '@turf/helpers';
import {lineStyle, dottedLineStyle} from '~/constants/styles';
import {makeShape} from '~/utils/make-shape';

const Line = ({dottedLine, coordinates, smooth}) => {
  const isSmooth = smooth && coordinates.length > 2;
  const line = isSmooth ? bezierSpline(helpers.lineString(coordinates)) : makeShape('LineString', coordinates);

  return (
    <ShapeSource id={`${randomID()}`} shape={line}>
      <LineLayer id={`${randomID()}`} style={dottedLine ? dottedLineStyle : lineStyle} />
    </ShapeSource>
  );
};

export default Line;
