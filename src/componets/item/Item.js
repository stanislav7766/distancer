import React from 'react';
import {Column, TextStyled, Row, Container} from './styles';

const Item = ({text, style, onPress, IconComponent}) => {
  const [flexIcon, flexText] = [style.flexIcon || 0.1, 1 - (style.flexIcon || 0.1)];
  return (
    <Container backgroundColor={style.backgroundColor} height={style.height} onPress={onPress}>
      <Row>
        <Column alignItems="flex-start" flex={flexIcon}>
          {IconComponent && IconComponent}
        </Column>
        <Column alignItems="flex-start" flex={flexText}>
          <TextStyled fontSize={style.fontSize} textColor={style.textColor}>
            {text}
          </TextStyled>
        </Column>
      </Row>
    </Container>
  );
};

export default Item;
