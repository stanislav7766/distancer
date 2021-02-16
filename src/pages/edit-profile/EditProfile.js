import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {CenterXY, Container, Row, Column, Styles, btnSaveStyles, mt20, mt30} from './styles';
import {RoundedIcon} from '~/componets/rounded-icon';
import useSpinner from '~/componets/spinner/useSpinner';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {Btn} from '~/componets/btn';
import {Avatar} from '~/componets/avatar';
import Toast from 'react-native-simple-toast';
import {updateProfile} from '~/actions';
import ProfileInputs from './ProfileInputs';
import ProfilePickers from './ProfilePickers';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {useNavigation} from '~/stores/navigation';

const EditProfile = ({withNewUser = false}) => {
  const {isLoading, setLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const {popToMainScreen} = useNavigation();
  const [profile, setProfile] = useState({firstName: '', lastName: '', age: '', gender: '', height: '', weight: ''});

  const auth = useAuth();

  useEffect(() => {
    setProfile(auth.profile);
  }, [auth]);

  const {themeStyle} = useTheme();
  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});

  const {arrowIconDims, headerStyle} = Styles(themeStyle);

  const onSubmitEditing = () => {
    if (isLoading) return;

    setLoading(true);
    setTimeout(() => {
      updateProfile({payload: {profile}})
        .then(({success, reason}) => {
          if (!success) {
            Toast.show(reason);
            return;
          }
          auth.setProfile(profile);
          goToMain();
        })
        .catch(err => Toast.show(err))
        .finally(_ => {
          setLoading(false);
        });
    }, 200);
  };

  const goToMain = () => {
    popToMainScreen();
  };

  const avatarSource = auth?.profile?.photoURL;

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

  const Inputs = <ProfileInputs {...InputsProps} />;

  const Pickers = <ProfilePickers {...PickersProps} />;

  const Header = (
    <Row>
      <Column alignItems="center">
        <Text style={headerStyle}>Profile settings</Text>
      </Column>
      {!withNewUser && <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={goToMain} />}
    </Row>
  );
  const AvatarView = (
    <Row {...mt30}>
      <Column alignItems={'center'}>
        <Avatar size={80} src={avatarSource} />
      </Column>
    </Row>
  );

  const SaveBtn = (
    <Row {...mt20}>
      <Column alignItems={'flex-start'}>
        <Btn {...btnSaveStyles} title={'Save'} onPress={onSubmitEditing} />
      </Column>
    </Row>
  );

  return (
    <>
      <Container backgroundColor={themeStyle.backgroundColor}>
        <CenterXY>
          {SpinnerComponent}
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
