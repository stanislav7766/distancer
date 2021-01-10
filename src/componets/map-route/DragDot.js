import React from 'react';
import {View} from 'react-native';
import {PointAnnotation} from '@react-native-mapbox-gl/maps';
import {annotationStyle} from '../../constants/styles';

const DragDot = ({coord, onDragEnd, onDragStart}) => (
  <PointAnnotation
    id={coord.id}
    selected
    onDragStart={e => onDragStart(e, coord.id)}
    onDragEnd={e => onDragEnd(e, coord.id)}
    draggable={true}
    coordinate={coord.coordinate}
  >
    <View style={annotationStyle} />
  </PointAnnotation>
);

export default DragDot;
