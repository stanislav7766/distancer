import React, {memo} from 'react';
import {ShapeSource, CircleLayer} from '@react-native-mapbox-gl/maps';
import {randomID} from '~/utils/random-id';
import {pressPoint, pressPointWrap} from '~/constants/styles';
import {makeShape} from '~/utils/make-shape';
import {isEqualJson} from '~/utils/validation/helpers';

const DOT_SIZE = 20;

const Dot = ({coord, onPress}) => {
  return (
    <ShapeSource
      width={DOT_SIZE}
      height={DOT_SIZE}
      hitbox={{width: DOT_SIZE, height: DOT_SIZE}}
      onPress={() => onPress(coord)}
      id={randomID()}
      shape={makeShape('Point', coord.coordinate)}
    >
      <CircleLayer minZoomLevel={15} id={`${randomID()}`} style={pressPointWrap} />
      <CircleLayer minZoomLevel={15} id={`${randomID()}`} style={pressPoint} />
    </ShapeSource>
  );
};

const onUpdate = (prev, next) => isEqualJson(prev, next);

export default memo(Dot, onUpdate);
