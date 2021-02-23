import React from 'react';
import {Btn} from '~/componets/btn';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {Row, Column, Styles, mt10, mb30, btnLogoutStyles, btnProfileStyles} from '../styles';
import {logoutUser} from '~/actions';
import Toast from 'react-native-simple-toast';
import {NO_CURRENT_USER, LOGOUT_CONFIRM} from '~/constants/constants';
import {Avatar} from '~/componets/avatar';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';

const GroupUser = ({goToEditProfile}) => {
  const makeCancelable = useCancelablePromise();

  const {themeStyle} = useTheme();
  const {isLoading, startLoading, stopLoading} = useSpinner();
  const {profile, setAuthorized} = useAuth();
  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();

  const {photoURL, email, firstName} = profile;
  const {avatarTitleStyle} = Styles(themeStyle);

  const onRequestConfirm = (text, onYes, onNo = onHideConfirm) => {
    setInitConfirm({
      text,
      onYes,
      onNo,
    });
    onShowConfirm();
  };

  const onPressLogout = () => {
    if (isLoading) return;

    startLoading();

    makeCancelable(logoutUser({payload: {userId: profile.userId}}), () => {
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

  const onRequestLogout = () => {
    onRequestConfirm(LOGOUT_CONFIRM, onPressLogout);
  };

  const onPressViewProfile = () => {
    if (isLoading) return;

    goToEditProfile();
  };

  const avatarSource = photoURL ? photoURL : null;
  const UserInfoGroup = (
    <Row {...mt10} {...mb30}>
      <Column justifyContent={'center'} alignItems={'flex-start'}>
        <Avatar size={80} title={firstName || email} titleStyle={avatarTitleStyle} src={avatarSource} />
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

export const UserGroup = observer(GroupUser);
