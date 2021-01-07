import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import {appModeContext} from '../../contexts/contexts';
import {CenterXY, Container, Row, Column, Styles, btnSaveStyles, mt20, mt30} from './styles';
import RoundedIcon from '../../componets/rounded-icon/RoundedIcon';
import useSpinner from '../../componets/spinner/useSpinner';
import {useModalPicker as usePicker} from '../../stores/modal-picker';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import Btn from '../../componets/btn/Btn';
import Avatar from '../../componets/avatar/Avatar';
import Toast from 'react-native-simple-toast';
import WithActions from '../../componets/with-actions/WithActions';
import {updateProfile as _updateProfile} from '../../actions';
import ProfileInputs from './ProfileInputs';
import ProfilePickers from './ProfilePickers';
import {observer} from 'mobx-react-lite';
import {useTheme} from '../../stores/theme';
import {useModalPicker} from '../../hooks/use-window-modal';

const EditProfile = ({navigator, updateProfile}) => {
  const {isLoading, setLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const pickerModal = usePicker();
  const [ModalPicker] = useModalPicker(pickerModal);

  const [profile, setProfile] = useState({firstName: '', lastName: '', age: '', gender: '', height: '', weight: ''});

  const {auth, setAuth} = useContext(appModeContext);

  useEffect(() => {
    const {authorized, ...restAuth} = auth;
    setProfile(restAuth);
  }, [auth]);

  const {themeStyle} = useTheme();
  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});

  const {arrowIconDims, headerStyle} = Styles(themeStyle);

  const onSubmitEditing = async () => {
    if (isLoading) {
      return;
    }
    //validation
    setLoading(true);
    setTimeout(() => {
      updateProfile({payload: {profile}})
        .then(({success, reason}) => {
          if (!success) {
            Toast.show(reason);
            return;
          }
          setAuth(profile);
          goToMain();
        })
        .catch(err => Toast.show(err))
        .finally(_ => {
          setLoading(false);
        });
    }, 200);
  };

  const goToMain = () => {
    navigator.popTo(navigator.stack[0].id, {animation: 'left'});
  };

  const avatarSource = auth.photoURL ? auth.photoURL : null;

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
      <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={goToMain} />
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
      {ModalPicker}
    </>
  );
};

const mapDispatchToProps = {
  updateProfile: _updateProfile,
};
export default WithActions(mapDispatchToProps)(observer(EditProfile));
