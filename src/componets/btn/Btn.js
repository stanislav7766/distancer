import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {stylesBtnForm, stylesBtnText} from './styles';

const Btn = ({onPress, onLongPress, style, title}) => {
  const {width, height, backgroundColor, color, borderRadius, elevation} = style;
  const a = {};
  borderRadius && (a.borderRadius = borderRadius);
  elevation && (a.elevation = elevation);

  return (
    <TouchableOpacity
      style={[stylesBtnForm, {width, height, backgroundColor}, a]}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Text style={[stylesBtnText, {color}]} textColor={color}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Btn;
