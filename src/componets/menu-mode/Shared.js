import React from 'react';
import {AppGroup, RouteGroup} from '~/componets/settings-group';
import {observer} from 'mobx-react-lite';

const Shared = () => {
  const AppSettingsGroup = <AppGroup />;
  const RouteSettingsGroup = <RouteGroup />;

  return (
    <>
      {RouteSettingsGroup}
      {AppSettingsGroup}
    </>
  );
};

export default observer(Shared);
