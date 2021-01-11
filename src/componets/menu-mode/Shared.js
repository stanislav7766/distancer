import React from 'react';
import {AppGroup, RouteGroup} from '../settings-group';
import {observer} from 'mobx-react-lite';

const Shared = ({themeStyle}) => {
  const AppSettingsGroup = <AppGroup themeStyle={themeStyle} />;
  const RouteSettingsGroup = <RouteGroup themeStyle={themeStyle} />;

  return (
    <>
      {RouteSettingsGroup}
      {AppSettingsGroup}
    </>
  );
};

export default observer(Shared);
