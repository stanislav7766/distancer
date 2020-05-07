import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styleWrap} from './styles';

const RoundedIcon = ({IconComponent, style, onPress}) => (
  <TouchableOpacity style={[styleWrap, style]} onPress={onPress}>
    {IconComponent}
  </TouchableOpacity>
);

export default RoundedIcon;
