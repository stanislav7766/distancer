import React, {useContext} from 'react';
import Btn from '../btn/Btn';
import {appModeContext} from '../../contexts/contexts';
import {useModalConfirm as useConfirm} from '../../stores/modal-confirm';
import {Row, Column, Styles, mt10, mb30, btnLogoutStyles, btnProfileStyles} from './styles';
import WithActions from '../with-actions/WithActions';
import {logoutUser as _logoutUser} from '../../actions';
import Toast from 'react-native-simple-toast';
import {NO_CURRENT_USER, LOGOUT_CONFIRM} from '../../constants/constants';
import Avatar from '../avatar/Avatar';
import {observer} from 'mobx-react-lite';

const GroupUser = ({themeStyle, loading, navigator, logoutUser}) => {
  const {auth, setDefaultAuth} = useContext(appModeContext);
  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();

  const {photoURL, email, firstName} = auth;
  const {avatarTitleStyle} = Styles(themeStyle);
  const {setLoading, isLoading, SpinnerComponent} = loading;

  const onRequestConfirm = (text, onYes, onNo = onHideConfirm) => {
    setInitConfirm({
      text,
      onYes,
      onNo,
    });
    onShowConfirm();
  };

  const onPressLogout = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    setTimeout(() => {
      logoutUser({payload: {userId: auth.userId}})
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

  const onRequestLogout = () => {
    onRequestConfirm(LOGOUT_CONFIRM, onPressLogout);
  };

  const onPressViewProfile = () => {
    if (isLoading) {
      return;
    }
    navigator.push('EditProfile', {}, {animation: 'bottom'});
  };

  const avatarSource = photoURL ? photoURL : null;
  const UserInfoGroup = (
    <Row {...mt10} {...mb30}>
      {SpinnerComponent}
      <Column justifyContent={'center'} alignItems={'flex-start'}>
        <Avatar size={80} title={firstName ?? email} titleStyle={avatarTitleStyle} src={avatarSource} />
      </Column>
      <Column justifyContent={'center'} alignItems={'flex-end'}>
        <Btn {...btnProfileStyles} onPress={onPressViewProfile} title={'View Profile'} />
        <Row {...mt10} />
        <Btn {...btnLogoutStyles} onPress={onRequestLogout} title={'Logout'} />
      </Column>
    </Row>
  );

  return <>{UserInfoGroup}</>;
};

const mapDispatchToProps = {
  logoutUser: _logoutUser,
};
export const UserGroup = WithActions(mapDispatchToProps)(observer(GroupUser));