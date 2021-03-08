import React from 'react';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {changeEmail, requestChangeEmail} from '~/actions';
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

export const useChangeEmail = () => {
  const makeCancelable = useCancelablePromise();
  const [showVerifyPassword, hideVerifyPassword] = useVerifyPassword();

  const {themeStyle} = useTheme();
  const {startLoading, stopLoading, isLoading} = useSpinner();
  const {setProfile, authorized} = useAuth();

  const {setInit: setInitInputConfirm, onShowInputConfirm, onHideInputConfirm} = useInputConfirm();

  const onChangeEmail = ({payload}) => {
    if (isLoading) return;
    startLoading({show: true});
    makeCancelable(changeEmail({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        setProfile({email: payload.email});
        Toast.show(papyrusify('menuMode.message.emailUpdated'));
      })
      .catch(err => {
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const passwordVerified = email => {
    hideVerifyPassword();
    onChangeEmail({payload: {email}});
  };

  const showChangeEmail = () => {
    setInitInputConfirm({
      preset: 'close',
      headerText: papyrusify('menuMode.message.updateEmailConfirm'),
      btnText: papyrusify('menuMode.button.change'),
      onYes: passwordVerified,
      input: {
        placeholder: papyrusify('menuMode.input.newEmail'),
      },
    });
    onShowInputConfirm();
  };

  const beforeChangeEmail = () => {
    onHideInputConfirm();
    showChangeEmail();
  };

  const onRequestChangeEmail = ({payload}) => {
    startLoading({show: false});
    makeCancelable(requestChangeEmail({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        showVerifyPassword(beforeChangeEmail);
      })
      .catch(err => {
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const onPressChangeEmail = () => {
    onRequestChangeEmail({payload: {authorized}});
  };

  const ChangeEmailText = <GroupText title={papyrusify('menuMode.preference.changeEmail')} themeStyle={themeStyle} />;

  const ChangeEmailTouch = <Touchable Child={ChangeEmailText} onPress={onPressChangeEmail} />;

  return [{Left: ChangeEmailTouch, Right: null}];
};
