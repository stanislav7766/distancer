import React from 'react';
import {Btn} from '~/componets/btn';
import {getLocaleStore} from '~/stores/locale';
import {Row, Column, btnSignInStyles, btnSignUpStyles, mt10, mb30} from '../styles';

const {papyrusify} = getLocaleStore();

export const SignGroup = ({goToAuthorization}) => {
  const SignSettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Column alignItems={'flex-start'}>
        <Btn
          {...btnSignInStyles}
          onPress={() => goToAuthorization('signIn')}
          title={papyrusify('menuMode.button.signIn')}
        />
      </Column>
      <Column alignItems={'flex-end'}>
        <Btn
          {...btnSignUpStyles}
          onPress={() => goToAuthorization('signUp')}
          title={papyrusify('menuMode.button.signUp')}
        />
      </Column>
    </Row>
  );

  return <>{SignSettingsGroup}</>;
};
