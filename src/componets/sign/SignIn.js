import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import TextInput from '../text-input/TextInput';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import IconLogo from '../svg-icons/icon-logo/IconLogo';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {appModeContext} from '../../contexts/contexts';
import {Row, Column, Form, Styles} from './styles';
import WithActions from '../with-actions/WithActions';
import {loginUser as _loginUser, loginWithGoogle as _loginWithGoogle} from '../../actions';
import Toast from 'react-native-simple-toast';
import GoogleSignBtn from '../google-sign-btn/GoogleSignBtn';
import useSpinner from '../spinner/useSpinner';

const SignIn = ({themeStyle, goToMain, loginUser, loginWithGoogle}) => {
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const [input, setInput] = useState({email: '', password: ''});
  const {setAuth} = useContext(appModeContext);

  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;
  const IconLogoWrap = <IconLogo width={40} height={43} />;

  const {btnDims, btnGoogleDims, arrowIconDims, inputStyle, greetingStyle, subGreetingStyle} = Styles(themeStyle);

  const onChangeText = ({text, type}) =>
    setInput(oldInput => ({
      ...oldInput,
      [type]: text,
    }));

  const _resultSignIn = ({success, reason, data}) => {
    if (!success) {
      Toast.show(reason);
      return;
    }
    setAuth({authorized: true, ...data.user});
    goToMain();
    Toast.show('Authorized');
  };

  const onPress = cb => {
    if (isLoading) return;
    cb();
  };

  const onPressSignInGoogle = async () => {
    setLoading(true);
    loginWithGoogle()
      .then(_resultSignIn)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };

  const onSubmitEditing = async () => {
    setLoading(true);
    loginUser({payload: {data: input}})
      .then(_resultSignIn)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };
  const Greeting = (
    <Row marginTop={10}>
      <Column alignItems="flex-start">
        <Text style={greetingStyle}>Welcome back,</Text>
        <Text autoCompleteType="email" style={subGreetingStyle}>
          sign in to continue
        </Text>
      </Column>
    </Row>
  );
  const SignInGoogle = (
    <Row marginTop={10}>
      <Column alignItems={'center'}>
        <GoogleSignBtn style={btnGoogleDims} title={'Sign In with Google'} onPress={onPressSignInGoogle} />
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
          <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={goToMain} />
        </Column>
        <Column alignItems={'flex-end'}>{IconLogoWrap}</Column>
      </Row>
      {Greeting}
      {SignInGoogle}
      {Or}
      {Inputs}
      <Row marginTop={20}>
        <Column alignItems={'flex-start'}>
          <Btn style={btnDims} title={'Sign In'} onPress={onSubmitEditing} />
        </Column>
      </Row>
    </Form>
  );
};

const mapDispatchToProps = {
  loginUser: _loginUser,
  loginWithGoogle: _loginWithGoogle,
};
export default WithActions(mapDispatchToProps)(SignIn);
