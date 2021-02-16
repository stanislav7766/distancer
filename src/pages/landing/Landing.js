import React from 'react';
import {MainMap} from '~/componets/map';
import {AppModeModal} from '~/componets/app-mode-modal';
import useListenSettings from '~/hooks/use-listen-settings';
import useGpsPermissions from '~/hooks/use-gps-permissions';
import {useCurrentUser} from '~/hooks/use-current-user';
import {observer} from 'mobx-react-lite';
import {Navbar} from '~/componets/navbar';

const Landing = () => {
  useGpsPermissions();
  useListenSettings();

  useCurrentUser();

  return (
    <>
      <MainMap />
      <AppModeModal />
      <Navbar />
    </>
  );
};

export default observer(Landing);
