import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {styleTextInput, styleContainer, styleUnderline} from './styles';

const Input = ({value, onChangeText, style, onSubmitEditing, placeholder, openModal}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    openModal();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styleContainer}>
      <TextInput
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
