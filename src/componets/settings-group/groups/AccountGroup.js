import React from 'react';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useModalInputConfirm as useInputConfirm} from '~/stores/modal-input-confirm';
import {changeEmail, requestChangeEmail, deleteAccount, requestChangePassword, changePassword} from '~/actions';
import {FormGroup, GroupText} from '~/componets/form-group';
import Toast from 'react-native-simple-toast';
import {Touchable} from '~/componets/touchable';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

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
    onRequestConfirm(papyrusify('menuMode.message.deleteAccountConfirm'), onPressDeleteAccount);
  };

  const onChangeEmail = ({payload}) => {
    changeEmail({payload})
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        Toast.show(papyrusify('menuMode.message.emailUpdated'));
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
        Toast.show(papyrusify('menuMode.message.passwordUpdated'));
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
          headerText: papyrusify('menuMode.message.updateEmailConfirm'),
          onYes: updateEmailConfirmed,
          input: {
            placeholder: papyrusify('menuMode.input.newEmail'),
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
          headerText: papyrusify('menuMode.message.updatePasswordConfirm'),
          onYes: updatePasswordConfirmed,
          input: {
            placeholder: papyrusify('menuMode.input.newPassword'),
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
        err === papyrusify('sign.message.noCurrentUser') ? setAuthorized(false) : Toast.show(err);
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const ChangeEmailText = <GroupText title={papyrusify('menuMode.preference.changeEmail')} themeStyle={themeStyle} />;
  const ChangePasswordText = (
    <GroupText title={papyrusify('menuMode.preference.changePassword')} themeStyle={themeStyle} />
  );
  const DeleteAccountText = (
    <GroupText title={papyrusify('menuMode.preference.deleteAccount')} themeStyle={themeStyle} />
  );

  const ChangeEmailTouch = <Touchable Child={ChangeEmailText} onPress={onPressChangeEmail} />;
  const ChangePasswordTouch = <Touchable Child={ChangePasswordText} onPress={onPressChangePassword} />;
  const DeleteAccountTouch = <Touchable Child={DeleteAccountText} onPress={onRequestDeleteAccount} />;

  const accountSettingsItems = [
    {Left: ChangeEmailTouch, Right: null},
    {Left: ChangePasswordTouch, Right: null},
    {Left: DeleteAccountTouch, Right: null},
  ];

  const AccountSettingsGroup = (
    <FormGroup
      items={accountSettingsItems}
      themeStyle={themeStyle}
      title={papyrusify('menuMode.title.accountSettings')}
    />
  );

  return <>{AccountSettingsGroup}</>;
};

export const AccountGroup = observer(GroupAccount);
