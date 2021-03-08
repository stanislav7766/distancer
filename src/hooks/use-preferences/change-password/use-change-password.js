import React from 'react';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {requestChangePassword, changePassword} from '~/actions';
import {GroupText} from '~/componets/form-group';
import Toast from 'react-native-simple-toast';
import {Touchable} from '~/componets/touchable';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';
import {useVerifyPassword} from '~/hooks/use-verify-password';

const {papyrusify} = getLocaleStore();

export const useChangePassword = () => {
  const makeCancelable = useCancelablePromise();
  const [showVerifyPassword, hideVerifyPassword] = useVerifyPassword();

  const {themeStyle} = useTheme();
  const {startLoading, stopLoading, isLoading} = useSpinner();
  const {authorized} = useAuth();

  const {setInit: setInitInputConfirm, onShowInputConfirm, onHideInputConfirm} = useInputConfirm();

  const onChangePassword = ({payload}) => {
    if (isLoading) return;

    startLoading({show: true});
    makeCancelable(changePassword({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        Toast.show(papyrusify('menuMode.message.passwordUpdated'));
      })
      .catch(err => {
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const passwordVerified = password => {
    hideVerifyPassword();
    onChangePassword({payload: {password}});
  };

  const showChangePassword = () => {
    setInitInputConfirm({
      preset: 'close',
      headerText: papyrusify('menuMode.message.updatePasswordConfirm'),
      btnText: papyrusify('menuMode.button.change'),
      onYes: passwordVerified,
      input: {
        placeholder: papyrusify('menuMode.input.newPassword'),
      },
    });
    onShowInputConfirm();
  };

  const beforeChangePassword = () => {
    onHideInputConfirm();
    showChangePassword();
  };

  const onRequestChangePassword = ({payload}) => {
    if (isLoading) return;
    startLoading({show: false});
    makeCancelable(requestChangePassword({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        showVerifyPassword(beforeChangePassword);
      })
      .catch(err => {
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const onPressChangePassword = () => {
    onRequestChangePassword({payload: {authorized}});
  };

  const ChangePasswordText = (
    <GroupText title={papyrusify('menuMode.preference.changePassword')} themeStyle={themeStyle} />
  );

  const ChangePasswordTouch = <Touchable Child={ChangePasswordText} onPress={onPressChangePassword} />;

  return [{Left: ChangePasswordTouch, Right: null}];
};
