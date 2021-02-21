import {useCallback} from 'react';
import {useMounted} from '../use-mounted';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useAuth} from '~/stores/auth';
import {useNavigation} from '~/stores/navigation';
import {PROFILE_FILLING_CONFIRM} from '~/constants/constants';
import {checkProfileFilled} from '~/actions';
import Toast from 'react-native-simple-toast';

export const useRemindFillProfile = () => {
  const {pushScreen} = useNavigation();
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
      onShowConfirm();
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
        if (data.filled) return;

        onRequestConfirm({
          text: PROFILE_FILLING_CONFIRM,
          onYes: goToEditProfile,
        });
      })
      .catch(err => Toast.show(err));
  }, [authorized, goToEditProfile, onRequestConfirm, profile]);

  useMounted(onCheckProfileFilled);

  return null;
};
