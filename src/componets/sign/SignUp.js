import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import TextInput from '../text-input/TextInput';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import {appModeContext} from '../../contexts/contexts';
import IconLogo from '../svg-icons/icon-logo/IconLogo';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {Row, Column, Form, Styles} from './styles';
import WithActions from '../with-actions/WithActions';
import {registerUser as _registerUser, registerWithGoogle as _registerWithGoogle} from '../../actions';
import Toast from 'react-native-simple-toast';
import GoogleSignBtn from '../google-sign-btn/GoogleSignBtn';
import useSpinner from '../spinner/useSpinner';

const SignUp = ({themeStyle, goToMain,goBack, registerUser, registerWithGoogle}) => {
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const [input, setInput] = useState({username: '', email: '', password: ''});
  const {setAuth} = useContext(appModeContext);

  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;
  const IconLogoWrap = <IconLogo width={40} height={43} />;

  const {btnDims, btnGoogleDims, arrowIconDims, inputStyle, greetingStyle, subGreetingStyle} = Styles(themeStyle);

  const onChangeText = ({text, type}) =>
    setInput(oldInput => ({
      ...oldInput,
      [type]: text,
    }));

  const _resultSignUp = ({success, reason, data}) => {
    if (!success) {
      Toast.show(reason);
      return;
    }
    setAuth({authorized: true, ...data.user});
    goToMain();
  };

  const onPress = cb => {
    if (isLoading) return;
    cb();
  };

  const onSubmitEditing = async () => {
    setLoading(true);
    registerUser({payload: {data: input}})
      .then(_resultSignUp)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };

  const onPressSignUpGoogle = async () => {
    setLoading(true);
    registerWithGoogle()
      .then(_resultSignUp)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };

  const Greeting = (
    <Row marginTop={10}>
      <Column alignItems="flex-start">
        <Text style={greetingStyle}>Welcome,</Text>
        <Text style={subGreetingStyle}>sign up to continue</Text>
      </Column>
    </Row>
  );

  const SignUpGoogle = (
    <Row marginTop={10}>
      <Column alignItems={'center'}>
        <GoogleSignBtn style={btnGoogleDims} title={'Sign Up with Google'} onPress={onPressSignUpGoogle} />
      </Column>
    </Row>
  );
  const Or = (
    <Row marginTop={20}>
      <Text style={subGreetingStyle}>Or</Text>
    </Row>
  );
  const Inputs = (
    <>
      <Row>
        <TextInput
          autoCompleteType="email"
          style={inputStyle}
          placeholder={'Email'}
          value={input.email}
          onChangeText={text => onChangeText({text, type: 'email'})}
        />
      </Row>
      <Row marginTop={10}>
        <TextInput
          secureTextEntry={true}
          autoCompleteType="password"
          style={inputStyle}
          placeholder={'Password'}
          value={input.password}
          onChangeText={text => onChangeText({text, type: 'password'})}
        />
      </Row>
    </>
  );

  return (
    <Form backgroundColor={themeStyle.backgroundColorSecondary}>
      {SpinnerComponent}
      <Row marginTop={10}>
        <Column alignItems={'flex-start'}>
          <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={goBack} />
        </Column>
        <Column alignItems={'flex-end'}>{IconLogoWrap}</Column>
      </Row>
      {Greeting}
      {SignUpGoogle}
      {Or}
      {Inputs}
      <Row marginTop={20}>
        <Column alignItems={'flex-start'}>
          <Btn style={btnDims} title={'Sign Up'} onPress={onSubmitEditing} />
        </Column>
      </Row>
    </Form>
  );
};

const mapDispatchToProps = {
  registerUser: _registerUser,
  registerWithGoogle: _registerWithGoogle,
};
export default WithActions(mapDispatchToProps)(SignUp);
