import React from 'react';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {deleteAccount} from '~/actions';
import {GroupText} from '~/componets/form-group';
import Toast from 'react-native-simple-toast';
import {Touchable} from '~/componets/touchable';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

export const useDeleteAccount = () => {
  const makeCancelable = useCancelablePromise();
  const {themeStyle} = useTheme();
  const {startLoading, stopLoading, isLoading} = useSpinner();
  const {profile, setAuthorized} = useAuth();

  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();

  const onRequestConfirm = (text, onYes, onNo = onHideConfirm) => {
    setInitConfirm({
      text,
      onYes,
      onNo,
    });
    onShowConfirm();
  };

  const onRequestDeleteAccount = () => {
    onRequestConfirm(papyrusify('menuMode.message.deleteAccountConfirm'), onPressDeleteAccount);
  };

  const onPressDeleteAccount = () => {
    if (isLoading) return;

    startLoading({show: true});
    makeCancelable(deleteAccount({payload: {userId: profile.userId}}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        setAuthorized(false);
      })
      .catch(err => {
        err === papyrusify('sign.message.noCurrentUser') ? setAuthorized(false) : Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const DeleteAccountText = (
    <GroupText title={papyrusify('menuMode.preference.deleteAccount')} themeStyle={themeStyle} />
  );

  const DeleteAccountTouch = <Touchable Child={DeleteAccountText} onPress={onRequestDeleteAccount} />;

  return [{Left: DeleteAccountTouch, Right: null}];
};
