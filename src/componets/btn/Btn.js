import React from 'react';
import {Container, BtnText} from './styles';

const Btn = ({onPress, onLongPress, containerStyle, textStyle, title}) => {
  return (
    <Container {...containerStyle} onLongPress={onLongPress} onPress={onPress}>
      <BtnText {...textStyle}>{title}</BtnText>
    </Container>
  );
};
export default Btn;
