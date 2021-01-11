import React from 'react';
import {SignGroup} from '../settings-group';

const NotAuthorized = ({navigator}) => {
  const SignGroupSettings = <SignGroup navigator={navigator} />;

  return <>{SignGroupSettings}</>;
};

export default NotAuthorized;
