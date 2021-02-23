import React from 'react';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {changeEmail, requestChangeEmail, deleteAccount, requestChangePassword, changePassword} from '~/actions';
import {FormGroup, GroupText} from '~/componets/form-group';
import Toast from 'react-native-simple-toast';
import {Touchable} from '~/componets/touchable';
import {
  NO_CURRENT_USER,
  DELETE_ACCOUNT_CONFIRM,
  UPDATE_EMAIL_CONFIRM,
  UPDATE_PASSWORD_CONFIRM,
} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';

const GroupAccount = () => {
  const makeCancelable = useCancelablePromise();

  const {themeStyle} = useTheme();
  const {startLoading, stopLoading, isLoading} = useSpinner();
  const {profile, setAuthorized, authorized} = useAuth();

  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();
  const {setInit: setInitInputConfirm, onShowInputConfirm, onHideInputConfirm} = useInputConfirm();

  const onRequestConfirm = (text, onYes, onNo = onHideConfirm) => {
    setInitConfirm({
      text,
      onYes,
      onNo,
    });
    onShowConfirm();
  };

  const onRequestInputConfirm = ({headerText, onYes, onNo = onHideInputConfirm, input}) => {
    setInitInputConfirm({
      headerText,
      onYes,
      onNo,
      input,
    });
    onShowInputConfirm();
  };

  const onRequestDeleteAccount = () => {
    onRequestConfirm(DELETE_ACCOUNT_CONFIRM, onPressDeleteAccount);
  };

  const onChangeEmail = ({payload}) => {
    changeEmail({payload})
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        Toast.show('Email updated');
      })
      .catch(err => {
        Toast.show(err);
      });
  };

  const onChangePassword = ({payload}) => {
    changePassword({payload})
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        Toast.show('Password updated');
      })
      .catch(err => {
        Toast.show(err);
      });
  };
  const updateEmailConfirmed = email => {
    onChangeEmail({payload: {email}});
  };

  const updatePasswordConfirmed = password => {
    onChangePassword({payload: {password}});
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
        onRequestInputConfirm({
          headerText: UPDATE_EMAIL_CONFIRM,
          onYes: updateEmailConfirmed,
          input: {
            placeholder: 'New Email',
          },
        });
      })
      .catch(err => {
        Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const onRequestChangePassword = ({payload}) => {
    startLoading({show: false});
    makeCancelable(requestChangePassword({payload}), () => {
      stopLoading();
    })
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        onRequestInputConfirm({
          headerText: UPDATE_PASSWORD_CONFIRM,
          onYes: updatePasswordConfirmed,
          input: {
            placeholder: 'New Password',
          },
        });
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
  const onPressChangePassword = () => {
    onRequestChangePassword({payload: {authorized}});
  };
  const onPressDeleteAccount = () => {
    if (isLoading) return;

    startLoading({show: false});
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
        err === NO_CURRENT_USER ? setAuthorized(false) : Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const ChangeEmailText = <GroupText title="Change Email" themeStyle={themeStyle} />;
  const ChangePasswordText = <GroupText title="Change Password" themeStyle={themeStyle} />;
  const DeleteAccountText = <GroupText title="Delete Account" themeStyle={themeStyle} />;

  const ChangeEmailTouch = <Touchable Child={ChangeEmailText} onPress={onPressChangeEmail} />;
  const ChangePasswordTouch = <Touchable Child={ChangePasswordText} onPress={onPressChangePassword} />;
  const DeleteAccountTouch = <Touchable Child={DeleteAccountText} onPress={onRequestDeleteAccount} />;

  const accountSettingsItems = [
    {Left: ChangeEmailTouch, Right: null},
    {Left: ChangePasswordTouch, Right: null},
    {Left: DeleteAccountTouch, Right: null},
  ];

  const AccountSettingsGroup = (
    <FormGroup items={accountSettingsItems} themeStyle={themeStyle} title="Account settings" />
  );

  return <>{AccountSettingsGroup}</>;
};

export const AccountGroup = observer(GroupAccount);
