import React from 'react';
import {ButtonContainer, ButtonText} from './styles';

const Btn = ({onPress, title, textColor, backgroundColor}) => (
  <ButtonContainer width={'158px'} height={'51px'} onPress={onPress} backgroundColor={backgroundColor}>
    <ButtonText textColor={textColor}>{title}</ButtonText>
  </ButtonContainer>
);
export default Btn;
