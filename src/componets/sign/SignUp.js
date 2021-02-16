import React, {useState} from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import {TextInput} from '~/componets/text-input';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {RoundedIcon} from '~/componets/rounded-icon';
import {Row, Column, Styles, btnGoogleStyles, btnSignUpStyles, mt30, mt10, mb30} from './styles';
import {registerUser, registerWithGoogle} from '~/actions';
import Toast from 'react-native-simple-toast';
import {GoogleSignBtn} from '~/componets/google-sign-btn';
import useSpinner from '~/componets/spinner/useSpinner';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';

const SignUp = ({themeStyle, goToProfile, goBack}) => {
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'bottom'});
  const [input, setInput] = useState({username: '', email: '', password: ''});
  const {setAuthorized, setProfile} = useAuth();

  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});

  const {arrowIconDims, inputStyle, greetingStyle, subGreetingStyle} = Styles(themeStyle);

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
    setProfile(data.user);
    setAuthorized(true);
    goToProfile();
  };

  const onSubmitEditing = () => {
    if (isLoading) return;
    setLoading(true);
    registerUser({payload: {data: input}})
      .then(_resultSignUp)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };

  const onPressSignUpGoogle = () => {
    if (isLoading) return;
    setLoading(true);
    registerWithGoogle()
      .then(_resultSignUp)
      .catch(err => Toast.show(err))
      .finally(_ => {
        setLoading(false);
      });
  };

  const Greeting = (
    <>
      <Text style={greetingStyle}>Welcome,</Text>
      <Text style={subGreetingStyle}>sign up to continue</Text>
    </>
  );

  const SignUpGoogle = (
    <Row {...mt10}>
      <Column alignItems={'center'}>
        <GoogleSignBtn {...btnGoogleStyles} title={'Continue with Google'} onPress={onPressSignUpGoogle} />
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
          autoCompleteType="email"
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
          <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={goBack} />
        </Column>
        <Column flex={0.8} alignItems={'flex-end'}>
          {Greeting}
        </Column>
      </Row>
      {Inputs}
      <Row {...mt30}>
        <Column alignItems={'center'}>
          <Btn {...btnSignUpStyles} title={'Sign Up'} onPress={onSubmitEditing} />
        </Column>
      </Row>
      {Or}
      {SignUpGoogle}
    </>
  );
};

export default observer(SignUp);
