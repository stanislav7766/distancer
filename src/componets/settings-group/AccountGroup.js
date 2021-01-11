import React, {useContext} from 'react';
import {appModeContext} from '../../contexts/contexts';
import {useModalConfirm as useConfirm} from '../../stores/modal-confirm';
import WithActions from '../with-actions/WithActions';
import {deleteAccount as _deleteAccount} from '../../actions';
import {FormGroup, GroupText} from '../form-group';
import Toast from 'react-native-simple-toast';
import Touchable from '../../componets/touchable/Touchable';
import {NO_CURRENT_USER, DELETE_ACCOUNT_CONFIRM} from '../../constants/constants';
import {observer} from 'mobx-react-lite';

const GroupAccount = ({themeStyle, loading, deleteAccount}) => {
  const {setLoading, isLoading} = loading;
  const {auth, setDefaultAuth} = useContext(appModeContext);

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
    onRequestConfirm(DELETE_ACCOUNT_CONFIRM, onPressDeleteAccount);
  };

  const onPressChangeEmail = () => {};
  const onPressChangePassword = () => {};
  const onPressDeleteAccount = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      deleteAccount({payload: {userId: auth.userId}})
        .then(({success, reason}) => {
          if (!success) {
            Toast.show(reason);
            return;
          }
          setDefaultAuth();
        })
        .catch(err => {
          err === NO_CURRENT_USER ? setDefaultAuth() : Toast.show(err);
        })
        .finally(_ => {
          setLoading(false);
        });
    }, 200);
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

const mapDispatchToProps = {
  deleteAccount: _deleteAccount,
};
export const AccountGroup = WithActions(mapDispatchToProps)(observer(GroupAccount));
