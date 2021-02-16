import React, {useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import {MainMap} from '~/componets/map';
import {AppModeModal} from '~/componets/app-mode-modal';
import useListenSettings from '~/hooks/use-listen-settings';
import useGpsPermissions from '~/hooks/use-gps-permissions';
import {getCurrentUser} from '~/actions';
import {observer} from 'mobx-react-lite';
import {Navbar} from '~/componets/navbar';
import {useAuth} from '~/stores/auth';

const Landing = () => {
  const {setProfile, setAuthorized} = useAuth();

  useGpsPermissions();
  useListenSettings();

  useEffect(() => {
    getCurrentUser()
      .then(({data, success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        const {user} = data;
        if (user) {
          setProfile(user);
          setAuthorized(true);
        }
      })
      .catch(err => Toast.show(err));
  }, [setAuthorized, setProfile]);

  return (
    <>
      <MainMap />
      <AppModeModal />
      <Navbar />
    </>
  );
};

export default observer(Landing);
