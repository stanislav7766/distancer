import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, CenterXY, Form, checkWrap} from './styles';
import IconCheck from '../svg-icons/icon-check/IconCheck';
const Window = ({children, backgroundColor, width, close}) => {
  const IconCheckWrap = <IconCheck width={33} height={28} fill={'#BFE3A5'} />;

  return (
    <Container>
      <CenterXY>
        <Form backgroundColor={backgroundColor} width={width}>
          <TouchableOpacity onPress={close} style={checkWrap}>
            {IconCheckWrap}
          </TouchableOpacity>
          {children}
        </Form>
      </CenterXY>
    </Container>
  );
};

export default Window;
