import React from 'react';
import {AppGroup} from '~/componets/settings-group';
import {observer} from 'mobx-react-lite';

const Shared = () => {
  const AppSettingsGroup = <AppGroup />;

  return <>{AppSettingsGroup}</>;
};

export default observer(Shared);
