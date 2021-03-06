import React from 'react';
import {TextInput} from '~/componets/text-input';
import {getLocaleStore} from '~/stores/locale';
import {Styles, Row, mt10} from './styles';

const {papyrusify} = getLocaleStore();

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
          placeholder={papyrusify('editProfile.input.firstName')}
          value={firstName}
          onChangeText={text => onChangeText({text, type: 'firstName'})}
        />
      </Row>
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={papyrusify('editProfile.input.lastName')}
          value={lastName}
          onChangeText={text => onChangeText({text, type: 'lastName'})}
        />
      </Row>
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={papyrusify('editProfile.input.age')}
          value={age}
          keyboardType="decimal-pad"
          onChangeText={text => onChangeText({text, type: 'age'})}
        />
      </Row>
      <Row />
    </>
  );
};
export default ProfileInputs;
