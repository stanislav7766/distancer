import {useCallback} from 'react';
import {useMounted} from '../use-mounted';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useAuth} from '~/stores/auth';
import {useNavigation} from '~/stores/navigation';
import {checkProfileFilled} from '~/actions';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useRemindFillProfile = () => {
  const {pushScreen, currentScreenId} = useNavigation();
  const {authorized, profile} = useAuth();

  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();

  const goToEditProfile = useCallback(() => {
    pushScreen({screenId: 'EditProfile'});
  }, [pushScreen]);

  const onRequestConfirm = useCallback(
    ({text, onYes, onNo = onHideConfirm}) => {
      setInitConfirm({
        text,
        onYes,
        onNo,
      });
      setTimeout(onShowConfirm, 1000);
    },
    [onHideConfirm, onShowConfirm, setInitConfirm],
  );

  const onCheckProfileFilled = useCallback(() => {
    if (!authorized) return;
    checkProfileFilled({payload: {profile}})
      .then(({data, success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        if (data.filled || currentScreenId !== 'Landing') return;

        onRequestConfirm({
          text: papyrusify('editProfile.message.profileFillingConfirm'),
          onYes: goToEditProfile,
        });
      })
      .catch(err => Toast.show(err));
  }, [authorized, currentScreenId, goToEditProfile, onRequestConfirm, profile]);

  useMounted(onCheckProfileFilled);

  return null;
};
