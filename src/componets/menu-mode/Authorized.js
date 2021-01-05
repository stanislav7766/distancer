import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Btn from '../btn/Btn';
import {appModeContext} from '../../contexts/contexts';
import {useSwitchCommon} from '../../hooks/use-switch';
import {Row, Column, Styles, mx0, mt10, mb30, orangeColor, btnLogoutStyles, btnProfileStyles} from './styles';
import {Form} from '../../constants/styles';
import WithActions from '../with-actions/WithActions';
import {logoutUser as _logoutUser, deleteAccount as _deleteAccount} from '../../actions';
import Toast from 'react-native-simple-toast';
import Touchable from '../../componets/touchable/Touchable';
import {NO_CURRENT_USER} from '../../constants/constants';
import Avatar from '../avatar/Avatar';
import useSpinner from '../spinner/useSpinner';

const Authorized = ({themeStyle, navigator, setDefaultAuth, logoutUser, deleteAccount, timerPicker, selectPicker}) => {
  const {auth} = useContext(appModeContext);
  const {photoURL, email, firstName} = auth;
  const {avatarTitleStyle, appSettingsStyle} = Styles(themeStyle);
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'top'});

  const [, renderSwitchCommon] = useSwitchCommon();

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
    <Row {...mt10} {...mb30}>
      {SpinnerComponent}
      <Column justifyContent={'center'} alignItems={'flex-start'}>
        <Avatar size={80} title={firstName ?? email} titleStyle={avatarTitleStyle} src={avatarSource} />
      </Column>
      <Column justifyContent={'center'} alignItems={'flex-end'}>
        <Btn {...btnProfileStyles} onPress={onPressViewProfile} title={'View Profile'} />
        <Row {...mt10} />
        <Btn {...btnLogoutStyles} onPress={onPressLogout} title={'Logout'} />
      </Column>
    </Row>
  );

  const AccountSettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row>
          <Text style={appSettingsStyle}>Account settings</Text>
        </Row>
        <Row {...mt10}>
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
              <Column alignItems="flex-start">
                <TouchableOpacity onPress={onPressDeleteAccount}>
                  <Text style={appSettingsStyle}>Delete Account</Text>
                </TouchableOpacity>
              </Column>
            </Row>
          </Column>
        </Row>
      </Form>
    </Row>
  );

  const ActivitySettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row>
          <Text style={appSettingsStyle}>Activity settings</Text>
        </Row>
        <Row {...mt10}>
          <Column>
            <Row {...mx0}>
              <Column alignItems="flex-start">
                <Text style={appSettingsStyle}>Auto pause</Text>
              </Column>
              <Column alignItems="flex-end">{renderSwitchCommon()}</Column>
            </Row>
            <Row {...mx0}>
              <Column alignItems="flex-start">
                <Text style={appSettingsStyle}>Vibrate on start</Text>
              </Column>
              <Column alignItems="flex-end">{renderSwitchCommon()}</Column>
            </Row>
            <Row {...mx0}>
              <Column alignItems={'flex-start'}>
                <Text style={appSettingsStyle}>Timer on start</Text>
              </Column>
              <Column alignItems={'flex-end'}>
                <Touchable
                  Child={<Text style={[appSettingsStyle, orangeColor]}>{timerPicker} sec</Text>}
                  onPress={() => selectPicker('timer')}
                />
              </Column>
            </Row>
          </Column>
        </Row>
      </Form>
    </Row>
  );

  return (
    <>
      {UserInfoGroup}
      {AccountSettingsGroup}
      {ActivitySettingsGroup}
    </>
  );
};

const mapDispatchToProps = {
  logoutUser: _logoutUser,
  deleteAccount: _deleteAccount,
};
export default WithActions(mapDispatchToProps)(Authorized);
