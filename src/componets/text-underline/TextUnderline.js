import React from 'react';
import {TextStyled, Container, Underline} from './styles';

const TextUnderline = ({text, style}) => (
  <Container>
    <TextStyled textColor={style.textColor}>{text}</TextStyled>
    <Underline borderBottomColor={style.underlineBluredColor} />
  </Container>
);

export default TextUnderline;
