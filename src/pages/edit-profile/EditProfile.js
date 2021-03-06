import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {CenterXY, Container, Row, Column, Styles, btnSaveStyles, mt20, mt30} from './styles';
import {RoundedIcon} from '~/componets/rounded-icon';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {Btn} from '~/componets/btn';
import {Avatar} from '~/componets/avatar';
import Toast from 'react-native-simple-toast';
import {markProfileFilled, updateProfile} from '~/actions';
import ProfileInputs from './ProfileInputs';
import ProfilePickers from './ProfilePickers';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useNavigation} from '~/stores/navigation';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useSpinner} from '~/stores/spinner';
import {Touchable} from '~/componets/touchable';
import {isExist} from '~/utils/validation/helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const imageProps = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 200,
  maxWidth: 200,
};

const EditProfile = ({withNewUser = false}) => {
  const makeCancelable = useCancelablePromise();

  const {isLoading, startLoading, stopLoading} = useSpinner();
  const {resetScreen, popToMainScreen} = useNavigation();
  const [profile, setProfile] = useState({firstName: '', lastName: '', age: '', gender: '', height: '', weight: ''});

  const auth = useAuth();

  useEffect(() => {
    setProfile(auth.profile);
  }, [auth.profile]);

  const avatarSource = auth?.profile?.photoURL;

  const [avatar, setAvatar] = useState({
    uri: avatarSource,
    changed: false,
  });
  const {themeStyle} = useTheme();
  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});

  const {arrowIconDims, headerStyle} = Styles(themeStyle);

  const onMarkFilledProfile = ({payload}) => {
    markProfileFilled({payload})
      .then()
      .catch(err => Toast.show(err));
  };

  const onSubmitEditing = () => {
    if (isLoading) return;

    startLoading();
    makeCancelable(updateProfile({payload: {profile, avatarURI: avatar.changed ? avatar.uri : ''}}), () => {
      stopLoading();
    })
      .then(({success, reason, data}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        auth.setProfile({...profile, ...data.partProfile});
        onMarkFilledProfile({payload: {filled: true, userId: auth.profile.userId}});
        goToMain();
      })
      .catch(err => Toast.show(err))
      .finally(_ => {
        stopLoading();
      });
  };

  const goToMain = () => {
    withNewUser ? resetScreen({screenId: 'Landing'}) : popToMainScreen();
  };

  const InputsProps = {
    themeStyle,
    profile,
    setProfile,
  };
  const PickersProps = {
    themeStyle,
    profile,
    setProfile,
  };

  const onChooseImage = () => {
    launchImageLibrary(imageProps, response => {
      const {errorCode, uri, didCancel} = response;
      if (didCancel) return;
      if (isExist(errorCode)) {
        const message =
          errorCode === 'permission'
            ? papyrusify('permissions.message.storageDenied')
            : papyrusify('common.message.errorOccurred');
        Toast.show(message);
        return;
      }
      setAvatar({
        uri,
        changed: true,
      });
    });
  };

  const Inputs = <ProfileInputs {...InputsProps} />;

  const Pickers = <ProfilePickers {...PickersProps} />;

  const Header = (
    <Row>
      <Column alignItems="center">
        <Text style={headerStyle}>{papyrusify('editProfile.message.profileSettings')}</Text>
      </Column>
      {!withNewUser && <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={goToMain} />}
    </Row>
  );
  const AvatarView = (
    <Row {...mt30}>
      <Column alignItems={'center'}>
        <Touchable Child={<Avatar size={80} src={avatar.uri} />} onPress={onChooseImage} />
      </Column>
    </Row>
  );

  const SaveBtn = (
    <Row {...mt20}>
      <Column alignItems={'flex-start'}>
        <Btn {...btnSaveStyles} title={papyrusify('editProfile.button.save')} onPress={onSubmitEditing} />
      </Column>
    </Row>
  );

  return (
    <>
      <Container backgroundColor={themeStyle.backgroundColor}>
        <CenterXY>
          {Header}
          {AvatarView}
          {Inputs}
          {Pickers}
          {SaveBtn}
        </CenterXY>
      </Container>
    </>
  );
};

export default observer(EditProfile);
