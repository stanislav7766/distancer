import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import TextInput from '../text-input/TextInput';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {appModeContext} from '../../contexts/contexts';
import {Row, Column, Styles, btnSignInStyles, btnGoogleStyles, mt10, mt30, mb30} from './styles';
import WithActions from '../with-actions/WithActions';
import {loginUser as _loginUser, loginWithGoogle as _loginWithGoogle} from '../../actions';
import Toast from 'react-native-simple-toast';
import GoogleSignBtn from '../google-sign-btn/GoogleSignBtn';
import useSpinner from '../spinner/useSpinner';

const SignIn = ({themeStyle, goToMain, loginUser, loginWithGoogle}) => {
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const [input, setInput] = useState({email: '', password: ''});
  const {setAuth} = useContext(appModeContext);

  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});

  const {arrowIconDims, inputStyle, greetingStyle, subGreetingStyle} = Styles(themeStyle);

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
    <>
      <Text style={greetingStyle}>Welcome back,</Text>
      <Text autoCompleteType="email" style={subGreetingStyle}>
        sign in to continue
      </Text>
    </>
  );
  const SignInGoogle = (
    <Row {...mt10}>
      <Column alignItems={'center'}>
        <GoogleSignBtn {...btnGoogleStyles} title={'With Google'} onPress={onPressSignInGoogle} />
      </Column>
    </Row>
  );
  const Or = (
    <Row {...mt10}>
      <Text style={subGreetingStyle}>or</Text>
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
      <Row {...mt10}>
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
    <>
      {SpinnerComponent}
      <Row alignItems="center" {...mb30} {...mt10}>
        <Column flex={0.2} alignItems={'flex-start'}>
          <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={goToMain} />
        </Column>
        <Column flex={0.8} alignItems={'flex-end'}>
          {Greeting}
        </Column>
      </Row>
      {Inputs}
      <Row {...mt30}>
        <Column alignItems={'center'}>
          <Btn {...btnSignInStyles} title={'Sign In'} onPress={onSubmitEditing} />
        </Column>
      </Row>
      {Or}
      {SignInGoogle}
    </>
  );
};

const mapDispatchToProps = {
  loginUser: _loginUser,
  loginWithGoogle: _loginWithGoogle,
};
export default WithActions(mapDispatchToProps)(SignIn);
