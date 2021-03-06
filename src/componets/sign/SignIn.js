import React, {useState} from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import {TextInput} from '~/componets/text-input';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {RoundedIcon} from '~/componets/rounded-icon';
import {Row, Column, Styles, btnSignInStyles, btnGoogleStyles, mt10, mt30, mb30} from './styles';
import {loginUser, loginWithGoogle} from '~/actions';
import Toast from 'react-native-simple-toast';
import {GoogleSignBtn} from '~/componets/google-sign-btn';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const SignIn = ({themeStyle, goToMain}) => {
  const {startLoading, stopLoading, isLoading} = useSpinner();
  const [input, setInput] = useState({email: '', password: ''});
  const {setAuthorized, setProfile} = useAuth();

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
    setProfile(data.user);
    setAuthorized(true);
    goToMain();
    Toast.show(papyrusify('signIn.message.authorized'));
  };

  const onPressSignInGoogle = () => {
    if (isLoading) return;
    startLoading();
    loginWithGoogle()
      .then(_resultSignIn)
      .catch(err => Toast.show(err))
      .finally(_ => {
        stopLoading();
      });
  };

  const onSubmitEditing = () => {
    if (isLoading) return;
    startLoading();
    loginUser({payload: {data: input}})
      .then(_resultSignIn)
      .catch(err => Toast.show(err))
      .finally(_ => {
        stopLoading();
      });
  };
  const Greeting = (
    <>
      <Text style={greetingStyle}>{papyrusify('signIn.message.welcomeBack')}</Text>
      <Text style={[subGreetingStyle]}>{papyrusify('signIn.message.signInToContinue')}</Text>
    </>
  );
  const SignInGoogle = (
    <Row {...mt10}>
      <Column alignItems={'center'}>
        <GoogleSignBtn
          {...btnGoogleStyles}
          title={papyrusify('signIn.button.withGoogle')}
          onPress={onPressSignInGoogle}
        />
      </Column>
    </Row>
  );
  const Or = (
    <Row {...mt10}>
      <Text style={subGreetingStyle}>{papyrusify('signIn.message.or')}</Text>
    </Row>
  );
  const Inputs = (
    <>
      <Row>
        <TextInput
          style={inputStyle}
          placeholder={papyrusify('sign.input.email')}
          value={input.email}
          onChangeText={text => onChangeText({text, type: 'email'})}
        />
      </Row>
      <Row {...mt10}>
        <TextInput
          secureTextEntry={true}
          autoCompleteType="password"
          style={inputStyle}
          placeholder={papyrusify('sign.input.password')}
          value={input.password}
          onChangeText={text => onChangeText({text, type: 'password'})}
        />
      </Row>
    </>
  );

  return (
    <>
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
          <Btn {...btnSignInStyles} title={papyrusify('signIn.button.signIn')} onPress={onSubmitEditing} />
        </Column>
      </Row>
      {Or}
      {SignInGoogle}
    </>
  );
};

export default observer(SignIn);
