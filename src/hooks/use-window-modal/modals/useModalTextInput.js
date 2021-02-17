import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {TextInput} from '~/componets/text-input';
import {styles, windowWidth, Styles, Row, mx0} from '../styles';
import {useTheme} from '~/stores/theme';

export const useModalTextInput = modalConfirm => {
  const [inputValue, setInputValue] = useState('');

  const {shownWindow, onShowInputConfirm, onHideInputConfirm, init} = modalConfirm;
  const {headerText, preset, onNo, onYes, input} = init;
  const {themeStyle} = useTheme();

  const {inputStyle} = Styles(themeStyle);

  const callYes = () => {
    onYes(inputValue);
    setInputValue('');
  };
  const callNo = () => {
    onNo();
    setInputValue('');
  };
  const onChangeText = text => {
    setInputValue(text);
  };

  const Header = (
    <View style={styles.textInputHeader}>
      <Row>
        <Text style={styles.windowText}>{headerText}</Text>
      </Row>
    </View>
  );

  const Input = (
    <View style={styles.centerXY}>
      <Row {...mx0}>
        <TextInput
          style={{...inputStyle, ...input.style}}
          placeholder={input.placeholder}
          value={inputValue}
          onChangeText={onChangeText}
        />
      </Row>
    </View>
  );

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={onHideInputConfirm}
      onBottomYes={callYes}
      onBottomNo={callNo}
      maskColor="#000"
      backgroundColor={themeStyle.backgroundColor}
      width={windowWidth}
    >
      <View style={styles.inputConfirmContainer}>
        {Header}
        {Input}
      </View>
    </Window>
  );
  return [ShowWindow, onShowInputConfirm, onHideInputConfirm];
};
