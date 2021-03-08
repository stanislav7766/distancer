import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {TextInput} from '~/componets/text-input';
import {styles, windowWidth, Styles, Row, mx0, Column, btnStyles, mt10} from '../styles';
import {useTheme} from '~/stores/theme';
import {Btn} from '~/componets/btn';
import {isEmptyString} from '~/utils/validation/helpers';

export const useModalTextInput = modalConfirm => {
  const [inputValue, setInputValue] = useState('');

  const {shownWindow, onShowInputConfirm, onHideInputConfirm, init} = modalConfirm;
  const {headerText, btnText, preset, onNo, onYes, input} = init;
  const {themeStyle} = useTheme();

  const {inputStyle} = Styles(themeStyle);

  const callYes = () => {
    onYes?.(inputValue);
    setInputValue('');
  };
  const callNo = () => {
    onNo?.();
    setInputValue('');
  };
  const onChangeText = text => {
    setInputValue(text);
  };

  const onCloseWindow = () => {
    callNo?.();
    onHideInputConfirm();
  };

  const Header = (
    <View style={styles.textInputHeader}>
      <Row>
        <Text style={styles.windowText}>{headerText}</Text>
      </Row>
    </View>
  );

  const Input = (
    <Row {...mx0}>
      <TextInput
        style={{...inputStyle, ...input.style}}
        placeholder={input.placeholder}
        value={inputValue}
        onChangeText={onChangeText}
      />
    </Row>
  );
  const showButton = preset !== 'footer' && !isEmptyString(btnText);

  const Button = showButton && (
    <Row {...mx0} {...mt10}>
      <Column alignItems={'center'}>
        <Btn {...btnStyles} title={btnText} onPress={callYes} />
      </Column>
    </Row>
  );
  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={onCloseWindow}
      onBottomYes={callYes}
      onBottomNo={callNo}
      maskColor="#000"
      backgroundColor={themeStyle.backgroundColor}
      width={windowWidth}
    >
      <View style={styles.inputConfirmContainer}>
        {Header}
        {Input}
        {Button}
      </View>
    </Window>
  );
  return [ShowWindow, onShowInputConfirm, onHideInputConfirm];
};
