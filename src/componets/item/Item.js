import React from 'react';
import {Column, TextStyled, Row, Container} from './styles';

const Item = ({text, style, onPress, IconComponent}) => {
  return (
    <Container backgroundColor={style.backgroundColor} height={style.height} onPress={onPress}>
      <Row>
        <Column width={'10%'}>{IconComponent && IconComponent}</Column>
        <Column width={'auto'}>
          <TextStyled textColor={style.textColor}> {text}</TextStyled>
        </Column>
      </Row>
    </Container>
  );
};

export default Item;
