import React, {memo} from 'react';
import {ShapeSource, CircleLayer} from '@react-native-mapbox-gl/maps';
import {randomID} from '../../utils/randomID';
import {pressPoint, pressPointWrap} from '../../constants/styles';
import {makeShape} from '../../utils/make-shape';

const Dot = ({coord, onPress}) => {
  return (
    <ShapeSource
      width={20}
      height={20}
      hitbox={{width: 20, height: 20}}
      onPress={() => {
        onPress(coord);
      }}
      id={randomID()}
      shape={makeShape('Point', coord.coordinate)}
    >
      <CircleLayer minZoomLevel={15} id={`${randomID()}`} style={pressPointWrap} />
      <CircleLayer minZoomLevel={15} id={`${randomID()}`} style={pressPoint} />
    </ShapeSource>
  );
};

const onUpdate = (prev, next) => JSON.stringify(prev) === JSON.stringify(next);

export default memo(Dot, onUpdate);
