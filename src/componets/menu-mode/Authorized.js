import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Btn from '../btn/Btn';
import {appModeContext} from '../../contexts/contexts';
import {Row, Column, Styles, mx0} from './styles';
import {Form} from '../../constants/styles';
import WithActions from '../with-actions/WithActions';
import {logoutUser as _logoutUser, deleteAccount as _deleteAccount} from '../../actions';
import Toast from 'react-native-simple-toast';
import {NO_CURRENT_USER} from '../../constants/constants';
import Avatar from '../avatar/Avatar';
import useSpinner from '../spinner/useSpinner';

const Authorized = ({themeStyle, navigator, setDefaultAuth, logoutUser, deleteAccount}) => {
  const {auth} = useContext(appModeContext);
  const {photoURL, email, firstName} = auth;
  const {btnDims, bgRed, avatarTitleStyle, appSettingsStyle, btnDeleteAccount} = Styles(themeStyle);
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'top'});

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

  const onPressViewProfile = () => {
    if (isLoading) {
      return;
    }
    navigator.push('EditProfile', {}, {animation: 'bottom'});
  };
  const onPressChange = type => {};
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

  const avatarSource = photoURL ? photoURL : null;
  const UserInfoGroup = (
    <Form backgroundColor={themeStyle.backgroundColor}>
      <Row>
        {SpinnerComponent}
        <Column alignItems={'flex-start'}>
          <Avatar size={80} title={firstName || email} titleStyle={avatarTitleStyle} src={avatarSource} />
        </Column>
        <Column justifyContent={'center'} alignItems={'flex-end'}>
          <Btn onPress={onPressViewProfile} style={{...btnDims}} title={'View Profile'} />
          <Row marginTop={10} {...mx0}>
            <Btn onPress={onPressLogout} style={{...btnDims, ...bgRed}} title={'Logout'} />
          </Row>
        </Column>
      </Row>
    </Form>
  );

  const AccountSettingsGroup = (
    <Form backgroundColor={themeStyle.backgroundColor}>
      <Row>
        <Text style={appSettingsStyle}>Account settings</Text>
      </Row>
      <Row marginTop={10}>
        <Column>
          <Row {...mx0}>
            <Column alignItems="flex-start">
              <TouchableOpacity onPress={() => onPressChange('email')}>
                <Text style={appSettingsStyle}>Change Email</Text>
              </TouchableOpacity>
            </Column>
          </Row>
          <Row {...mx0}>
            <Column alignItems="flex-start">
              <TouchableOpacity onPress={() => onPressChange('password')}>
                <Text style={appSettingsStyle}>Change Password</Text>
              </TouchableOpacity>
            </Column>
          </Row>
          <Row {...mx0}>
            <Column alignItems="flex-end">
              <Btn onPress={onPressDeleteAccount} style={btnDeleteAccount} title={'Delete Account'} />
            </Column>
          </Row>
        </Column>
      </Row>
    </Form>
  );

  return (
    <>
      <Row marginTop={10}>{UserInfoGroup}</Row>
      <Row marginTop={10}>{AccountSettingsGroup}</Row>
    </>
  );
};

const mapDispatchToProps = {
  logoutUser: _logoutUser,
  deleteAccount: _deleteAccount,
};
export default WithActions(mapDispatchToProps)(Authorized);
