import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import {themeContext, appModeContext} from '../../contexts/contexts';
import {CenterXY, Container, Row, Column, Styles, Form} from './styles';
import RoundedIcon from '../../componets/rounded-icon/RoundedIcon';
import useSpinner from '../../componets/spinner/useSpinner';
import IconLeftArrow from '../../componets/svg-icons/icon-left-arrow/IconLeftArrow';
import Btn from '../../componets/btn/Btn';
import Avatar from '../../componets/avatar/Avatar';
import Window from '../../componets/window/Window';
import Toast from 'react-native-simple-toast';
import {WINDOW_WIDTH} from '../../constants/constants';
import WithActions from '../../componets/with-actions/WithActions';
import {updateProfile as _updateProfile} from '../../actions';
import ProfileInputs from './ProfileInputs';
import ProfilePickers from './ProfilePickers';
import RenderPicker from './RenderPicker';

const EditProfile = ({navigator, updateProfile}) => {
  const {isLoading, setLoading, SpinnerComponent} = useSpinner({position: 'bottom'});

  const [showWindow, setShowWindow] = useState(false);
  const [pickerMode, setPickerMode] = useState('height');

  const [profile, setProfile] = useState({firstName: '', lastName: '', age: '', gender: '', height: '', weight: ''});

  const {auth, setAuth} = useContext(appModeContext);

  useEffect(() => {
    const {authorized, ...restAuth} = auth;
    setProfile(restAuth);
  }, [auth]);

  const {theme, getThemeStyle} = useContext(themeContext);
  const themeStyle = getThemeStyle(theme);
  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;

  const {btnDims, arrowIconDims, headerStyle} = Styles(themeStyle);

  const closeWindow = () => setShowWindow(false);

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

  const selectPicker = type => {
    setPickerMode(type);
    setShowWindow(true);
  };

  const InputsProps = {
    themeStyle,
    profile,
    setProfile,
  };
  const PickersProps = {
    themeStyle,
    profile,
    selectPicker,
  };
  const PickerProps = {
    pickerMode,
    profile,
    setProfile,
    themeStyle,
  };

  const Inputs = <ProfileInputs {...InputsProps} />;

  const Pickers = <ProfilePickers {...PickersProps} />;

  const Picker = <RenderPicker {...PickerProps} />;

  const Header = (
    <Row marginTop={10}>
      <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={goToMain} />
      <Column alignItems={'center'}>
        <Text style={headerStyle}>Profile</Text>
      </Column>
    </Row>
  );
  const AvatarView = (
    <Row marginTop={30}>
      <Column alignItems={'center'}>
        <Avatar size={80} src={avatarSource} />
      </Column>
    </Row>
  );

  const SaveBtn = (
    <Row marginTop={20}>
      <Column alignItems={'flex-start'}>
        <Btn style={btnDims} title={'Save'} onPress={onSubmitEditing} />
      </Column>
    </Row>
  );

  return (
    <>
      <Container backgroundColor={themeStyle.backgroundColor}>
        <CenterXY>
          <Row>
            <Form backgroundColor={themeStyle.backgroundColorSecondary}>
              {SpinnerComponent}
              {Header}
              {AvatarView}
              {Inputs}
              {Pickers}
              {SaveBtn}
            </Form>
          </Row>
        </CenterXY>
      </Container>
      {showWindow && (
        <Window close={closeWindow} backgroundColor={themeStyle.backgroundColorSecondary} width={WINDOW_WIDTH * 0.8}>
          {Picker}
        </Window>
      )}
    </>
  );
};

const mapDispatchToProps = {
  updateProfile: _updateProfile,
};
export default WithActions(mapDispatchToProps)(EditProfile);
