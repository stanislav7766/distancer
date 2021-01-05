import React from 'react';
import Btn from '../btn/Btn';
import {Row, Column, btnSignInStyles, btnSignUpStyles, mt10, mb30} from './styles';

const NotAuthorized = ({themeStyle, navigator}) => {
  const goToAuthorization = type => {
    navigator.push('Authorization', {type}, {animation: 'bottom'});
  };

  const SignGroup = (
    <Row {...mb30} {...mt10}>
      <Column alignItems={'flex-start'}>
        <Btn {...btnSignInStyles} onPress={() => goToAuthorization('signIn')} title={'Sign in'} />
      </Column>
      <Column alignItems={'flex-end'}>
        <Btn {...btnSignUpStyles} onPress={() => goToAuthorization('signUp')} title={'Sign up'} />
      </Column>
    </Row>
  );

  return <>{SignGroup}</>;
};

export default NotAuthorized;
