import React from 'react';
import {Text} from 'react-native';
import {Styles} from './styles';

export const GroupText = ({style, title, themeStyle}) => {
  const {groupTextStyle} = Styles(themeStyle);

  return <Text style={[groupTextStyle, style]}>{title}</Text>;
};
