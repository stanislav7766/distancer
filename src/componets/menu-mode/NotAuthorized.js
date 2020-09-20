import React from 'react';
import Btn from '../btn/Btn';
import {Row, Column, Styles} from './styles';
import {Form} from '../../constants/styles';

const NotAuthorized = ({themeStyle, navigator}) => {
  const {btnDims, bgGreen} = Styles(themeStyle);

  const goToAuthorization = type => {
    navigator.push('Authorization', {type}, {animation: 'bottom'});
  };

  const SignGroup = (
    <Form backgroundColor={themeStyle.backgroundColor}>
      <Row>
        <Column alignItems={'flex-start'}>
          <Btn onPress={() => goToAuthorization('signIn')} style={btnDims} title={'Sign in'} />
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn onPress={() => goToAuthorization('signUp')} style={{...btnDims, ...bgGreen}} title={'Sign up'} />
        </Column>
      </Row>
    </Form>
  );

  return <Row marginTop={10}>{SignGroup}</Row>;
};

export default NotAuthorized;
