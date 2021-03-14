import React from 'react';
import {MainMap} from '~/componets/map';
import {AppModeModal} from '~/componets/app-mode-modal';
import useGpsPermissions from '~/hooks/use-gps-permissions';
import {useRemindFillProfile} from '~/hooks/use-remind-fill-profile';
import {useRemindNotFinishedActivity} from '~/hooks/use-remind-not-finished-activity';
import {useCurrentUser} from '~/hooks/use-current-user';
import {observer} from 'mobx-react-lite';
import {Navbar} from '~/componets/navbar';

const Landing = () => {
  useRemindNotFinishedActivity();
  useGpsPermissions();
  useRemindFillProfile();
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
