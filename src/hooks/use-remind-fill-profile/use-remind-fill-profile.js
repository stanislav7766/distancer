import {useCallback, useEffect, useRef} from 'react';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useAuth} from '~/stores/auth';
import {useNavigation} from '~/stores/navigation';
import {PROFILE_FILLING_CONFIRM} from '~/constants/constants';
import {checkProfileFilled} from '~/actions';
import Toast from 'react-native-simple-toast';

export const useRemindFillProfile = () => {
  const mountedRef = useRef(false);

  const {pushScreen} = useNavigation();
  const {
    authorized,
    profile: {userId},
  } = useAuth();

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
    checkProfileFilled({payload: {userId}})
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
  }, [authorized, goToEditProfile, onRequestConfirm, userId]);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    onCheckProfileFilled();
  }, [onCheckProfileFilled]);

  return null;
};
