import React from 'react';
import {SignGroup} from '~/componets/settings-group';
import {useNavigation} from '~/stores/navigation';

const NotAuthorized = () => {
  const {pushScreen} = useNavigation();

  const goToAuthorization = type => {
    pushScreen({screenId: 'Authorization', screenProps: {type}});
  };
  const SignGroupSettings = <SignGroup goToAuthorization={goToAuthorization} />;

  return <>{SignGroupSettings}</>;
};

export default NotAuthorized;
