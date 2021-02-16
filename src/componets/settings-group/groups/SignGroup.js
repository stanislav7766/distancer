import React from 'react';
import {Btn} from '~/componets/btn';
import {Row, Column, btnSignInStyles, btnSignUpStyles, mt10, mb30} from '../styles';

export const SignGroup = ({goToAuthorization}) => {
  const SignSettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Column alignItems={'flex-start'}>
        <Btn {...btnSignInStyles} onPress={() => goToAuthorization('signIn')} title={'Sign in'} />
      </Column>
      <Column alignItems={'flex-end'}>
        <Btn {...btnSignUpStyles} onPress={() => goToAuthorization('signUp')} title={'Sign up'} />
      </Column>
    </Row>
  );

  return <>{SignSettingsGroup}</>;
};
