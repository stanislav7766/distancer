import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import {themeContext, appModeContext} from '../../contexts/contexts';
import {CenterXY, Container, Row, Column, Styles, btnSaveStyles, mt20, mt30} from './styles';
import RoundedIcon from '../../componets/rounded-icon/RoundedIcon';
import useSpinner from '../../componets/spinner/useSpinner';
import {useModalPicker} from '../../hooks/use-window-modal';
import {MAX_HEIGHT, MAX_WEIGHT, DEFAULT_GENDER, DEFAULT_HEIGHT, DEFAULT_WEIGHT} from '../../constants/constants';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import Btn from '../../componets/btn/Btn';
import Avatar from '../../componets/avatar/Avatar';
import Toast from 'react-native-simple-toast';
import WithActions from '../../componets/with-actions/WithActions';
import {updateProfile as _updateProfile} from '../../actions';
import ProfileInputs from './ProfileInputs';
import ProfilePickers from './ProfilePickers';

const heightPicker = () => new Array(MAX_HEIGHT).fill(0).map((_, i) => ({label: `${i + 1} cm`, value: `${i + 1}`}));
const weightPicker = () => new Array(MAX_WEIGHT).fill(0).map((_, i) => ({label: `${i + 1} kgs`, value: `${i + 1}`}));
const genderPicker = () => [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];

const itemsPicker = type =>
  ({
    height: heightPicker(),
    weight: weightPicker(),
    gender: genderPicker(),
  }[type]);

const EditProfile = ({navigator, updateProfile}) => {
  const {isLoading, setLoading, SpinnerComponent} = useSpinner({position: 'bottom'});

  const [pickerMode, setPickerMode] = useState('height');

  const onValueChange = ([value]) => {
    setProfile(old => ({...old, [pickerMode]: value}));
  };

  const [profile, setProfile] = useState({firstName: '', lastName: '', age: '', gender: '', height: '', weight: ''});

  const [selected, setSelected] = useState([]);

  const {auth, setAuth} = useContext(appModeContext);

  useEffect(() => {
    const {authorized, ...restAuth} = auth;
    setProfile(restAuth);
  }, [auth]);

  const {theme, getThemeStyle} = useContext(themeContext);
  const themeStyle = getThemeStyle(theme);
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

  const [ModalPicker, onShowModalPicker] = useModalPicker({
    pickerItems: itemsPicker(pickerMode),
    selectedItems: [profile[pickerMode]],
    defaultItem: profile[pickerMode],
    setSelectedItems: onValueChange,
    mode: 'single',
  });

  const selectPicker = type => {
    setPickerMode(type);
    onShowModalPicker();
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
export default WithActions(mapDispatchToProps)(EditProfile);
