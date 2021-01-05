import React from 'react';
import {Container, BtnText, Row, Column, mx0} from './styles';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getGoogle} from '../../assets/svg-icons/google';

const GoogleSignBtn = ({title, onPress, containerStyle, textStyle}) => {
  const {height} = containerStyle;
  const IconGoogle = useSvgFactory(getGoogle, {width: 25, height: 25});
  const googleProps = {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#fff',
    height,
  };

  return (
    <Container {...containerStyle} onPress={onPress}>
      <Row {...mx0}>
        <Column {...googleProps} flex={0.1}>
          {IconGoogle}
        </Column>
        <Column alignItems="center" flex={0.9}>
          <BtnText {...textStyle}>{title}</BtnText>
        </Column>
      </Row>
    </Container>
  );
};
export default GoogleSignBtn;
