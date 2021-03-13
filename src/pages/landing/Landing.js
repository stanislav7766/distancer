import React from 'react';
import {MainMap} from '~/componets/map';
import {AppModeModal} from '~/componets/app-mode-modal';
import {useRemindFillProfile} from '~/hooks/use-remind-fill-profile';
import {observer} from 'mobx-react-lite';
import {Navbar} from '~/componets/navbar';

const Landing = () => {
  useRemindFillProfile();

  return (
    <>
      <MainMap />
      <AppModeModal />
      <Navbar />
    </>
  );
};

export default observer(Landing);
