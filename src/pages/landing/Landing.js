import React, {useEffect, useContext, Fragment} from 'react';
import {appModeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import Map from '../../componets/map/Map';
import Modal from '../../componets/modal/Modal';
import useListenSettings from '../../hooks/use-listen-settings';
import useGpsPermissions from '../../hooks/use-gps-permissions';
import WithActions from '../../componets/with-actions/WithActions';
import {getCurrentUser as _getCurrentUser} from '../../actions';

const Landing = ({navigator, getCurrentUser}) => {
  const {setAuth} = useContext(appModeContext);

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
        user && setAuth({authorized: true, ...user});
      })
      .catch(err => Toast.show(err));
  }, [getCurrentUser, setAuth]);

  return (
    <Fragment>
      <Map />
      <Modal navigator={navigator} />
    </Fragment>
  );
};
const mapDispatchToProps = {
  getCurrentUser: _getCurrentUser,
};
export default WithActions(mapDispatchToProps)(Landing);
