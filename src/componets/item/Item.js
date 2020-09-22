import React from 'react';
import {Column, TextStyled, Row, Container} from './styles';

const Item = ({text, style, onPress, IconComponent}) => {
  return (
    <Container backgroundColor={style.backgroundColor} height={style.height} onPress={onPress}>
      <Row>
        <Column width={'auto'}>{IconComponent && IconComponent}</Column>
        <Column marginLeft={10} width={'auto'}>
          <TextStyled fontSize={style.fontSize} textColor={style.textColor}>
            {text}
          </TextStyled>
        </Column>
      </Row>
    </Container>
  );
};

export default Item;
