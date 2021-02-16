import React from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {styles, windowWidth} from '../styles';
import {useTheme} from '~/stores/theme';

export const useModalFooter = modalConfirm => {
  const {shownWindow, onShowConfirm, onHideConfirm, init} = modalConfirm;
  const {text, preset, onNo, onYes} = init;
  const {themeStyle} = useTheme();

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={onHideConfirm}
      onBottomYes={onYes}
      onBottomNo={onNo}
      maskColor="#000"
      backgroundColor={themeStyle.backgroundColor}
      width={windowWidth}
    >
      <View style={styles.windowTextWrap}>
        <Text style={styles.windowText}>{text}</Text>
      </View>
    </Window>
  );
  return [ShowWindow, onShowConfirm, onHideConfirm];
};
