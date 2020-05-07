import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {stylesBtnForm, stylesBtnText} from './styles';

const Btn = ({onPress, style, title}) => {
  const {width, height, backgroundColor, color} = style;
  return (
    <TouchableOpacity style={[stylesBtnForm, {width, height, backgroundColor}]} onPress={onPress}>
      <Text style={[stylesBtnText, {color}]} textColor={color}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Btn;
