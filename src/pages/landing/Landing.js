import React, {useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import Map from '../../componets/map/Map';
import Modal from '../../componets/modal/Modal';
import useListenSettings from '../../hooks/use-listen-settings';
import useGpsPermissions from '../../hooks/use-gps-permissions';
import WithActions from '../../componets/with-actions/WithActions';
import {getCurrentUser as _getCurrentUser} from '../../actions';
import {observer} from 'mobx-react-lite';
import {useAuth} from '../../stores/auth';
import {useModalPicker as usePicker} from '../../stores/modal-picker';
import {useModalConfirm as useConfirm} from '../../stores/modal-confirm';
import {useModalPicker} from '../../hooks/use-window-modal';
import {useModalFooter as useModalConfirm} from '../../hooks/use-window-modal/useModalFooter';

const Landing = ({navigator, getCurrentUser}) => {
  const {setProfile, setAuthorized} = useAuth();
  const pickerModal = usePicker();
  const confirmModal = useConfirm();
  const [ModalPicker] = useModalPicker(pickerModal);
  const [ModalConfirm] = useModalConfirm(confirmModal);

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
  }, [getCurrentUser, setAuthorized, setProfile]);

  return (
    <>
      <Map />
      <Modal navigator={navigator} />
      {ModalPicker}
      {ModalConfirm}
    </>
  );
};
const mapDispatchToProps = {
  getCurrentUser: _getCurrentUser,
};
export default WithActions(mapDispatchToProps)(observer(Landing));
