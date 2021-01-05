import React from 'react';
import {Container} from './styles';

const RoundedIcon = ({IconComponent, style, onPress}) => (
  <Container {...style} onPress={onPress}>
    {IconComponent}
  </Container>
);

export default RoundedIcon;
