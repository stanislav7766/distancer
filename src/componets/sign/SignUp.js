import React, {useState} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import TextInput from '../text-input/TextInput';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import IconLogo from '../svg-icons/icon-logo/IconLogo';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {Row, Column, Form, Styles} from './styles';

const SignUp = ({themeStyle, goToMain}) => {
  const [input, setInput] = useState({username: '', email: '', password: ''});
  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;
  const IconLogoWrap = <IconLogo width={40} height={43} />;

  const {btnDims, arrowIconDims, inputStyle, greetingStyle, subGreetingStyle} = Styles(themeStyle);

  const onChangeText = ({text, type}) =>
    setInput(oldInput => ({
      ...oldInput,
      [type]: text,
    }));

  const onSubmitEditing = async () => {};

  const Greeting = (
    <Row marginTop={10}>
      <Column alignItems="flex-start">
        <Text style={greetingStyle}>Welcome,</Text>
        <Text style={subGreetingStyle}>sign up to continue</Text>
      </Column>
    </Row>
  );
  const Inputs = (
    <>
      <Row marginTop={10}>
        <TextInput
          autoCompleteType="username"
          style={inputStyle}
          placeholder={'User Name'}
          value={input.username}
          onSubmitEditing={onSubmitEditing}
          onChangeText={text => onChangeText({text, type: 'username'})}
        />
      </Row>
      <Row marginTop={10}>
        <TextInput
          autoCompleteType="email"
          style={inputStyle}
          placeholder={'Email'}
          value={input.email}
          onSubmitEditing={onSubmitEditing}
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
          onSubmitEditing={onSubmitEditing}
          onChangeText={text => onChangeText({text, type: 'password'})}
        />
      </Row>
    </>
  );

  return (
    <Form backgroundColor={themeStyle.backgroundColorSecondary}>
      <Row marginTop={10}>
        <Column alignItems={'flex-start'}>
          <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={goToMain} />
        </Column>
        <Column alignItems={'flex-end'}>{IconLogoWrap}</Column>
      </Row>
      {Greeting}
      {Inputs}
      <Row marginTop={20}>
        <Column alignItems={'flex-start'}>
          <Btn style={btnDims} title={'Sign Up'} onPress={onSubmitEditing} />
        </Column>
      </Row>
    </Form>
  );
};
export default SignUp;
