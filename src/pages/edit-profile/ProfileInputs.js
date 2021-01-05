import React from 'react';
import TextInput from '../../componets/text-input/TextInput';
import {Styles, Row, mt10} from './styles';

const ProfileInputs = ({themeStyle, profile, setProfile}) => {
  const {inputStyle} = Styles(themeStyle);

  const {firstName, lastName, age} = profile;

  const onChangeText = ({text, type}) =>
    setProfile(oldInput => ({
      ...oldInput,
      [type]: text,
    }));

  return (
    <>
      <Row>
        <TextInput
          style={inputStyle}
          placeholder={'First name'}
          value={firstName}
          onChangeText={text => onChangeText({text, type: 'firstName'})}
        />
      </Row>
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={'Last name'}
          value={lastName}
          onChangeText={text => onChangeText({text, type: 'lastName'})}
        />
      </Row>
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={'Age'}
          value={age}
          onChangeText={text => onChangeText({text, type: 'age'})}
        />
      </Row>
      <Row />
    </>
  );
};
export default ProfileInputs;
