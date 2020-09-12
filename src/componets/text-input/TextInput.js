import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {styleTextInput, styleContainer, styleUnderline} from './styles';

const Input = ({
  value,
  autoCompleteType,
  secureTextEntry,
  onChangeText,
  style,
  onSubmitEditing,
  placeholder,
  openModal,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    openModal && openModal();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styleContainer}>
      <TextInput
        secureTextEntry={secureTextEntry || false}
        autoCompleteType={autoCompleteType || 'off'}
        style={(styleTextInput, {color: style.textColor})}
        placeholder={placeholder}
        placeholderTextColor={style.placeholderColor}
        onSubmitEditing={onSubmitEditing}
        keyboardType="default"
        onFocus={handleFocus}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
      />
      <View
        style={styleUnderline}
        borderBottomColor={`${isFocused || value ? style.underlineFocusedColor : '#d3d3d3'}`}
      />
    </View>
  );
};

export default Input;
