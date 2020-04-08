import React, {useState} from 'react';
import {TextInputStyled, Container, Underline} from './styles';

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
    <Container>
      <TextInputStyled
        textColor={style.textColor}
        placeholder={placeholder}
        placeholderTextColor={style.placeholderColor}
        onSubmitEditing={onSubmitEditing}
        keyboardType="default"
        onFocus={handleFocus}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
      />
      <Underline
        borderBottomColor={`${isFocused || value ? style.underlineFocusedColor : style.underlineBluredColor}`}
      />
    </Container>
  );
};

export default Input;
