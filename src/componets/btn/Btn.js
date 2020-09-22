import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {stylesBtnForm, stylesBtnText} from './styles';

const Btn = ({onPress, onLongPress, style, title}) => {
  const {width, height, backgroundColor, color, borderRadius, elevation, borderWidth, borderColor} = style;
  const a = {};
  borderRadius && (a.borderRadius = borderRadius);
  borderWidth && (a.borderWidth = borderWidth);
  borderColor && (a.borderColor = borderColor);
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
