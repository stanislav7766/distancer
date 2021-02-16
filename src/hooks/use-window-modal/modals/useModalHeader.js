import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {styles, windowWidth} from '../styles';
import {useTheme} from '~/stores/theme';

export const useModalHeader = ({text, preset, onClose}) => {
  const [shownWindow, setShowWindow] = useState(false);
  const {themeStyle} = useTheme();

  const onHideWindow = useCallback(() => {
    setShowWindow(false);
  }, []);
  const onShowWindow = useCallback(() => {
    setShowWindow(true);
  }, []);

  const closeWindow = useCallback(() => {
    onClose();
    onHideWindow();
  }, [onClose, onHideWindow]);

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={closeWindow}
      maskColor="#000"
      backgroundColor={themeStyle.backgroundColor}
      width={windowWidth}
    >
      <View style={styles.windowTextWrap}>
        <Text style={styles.windowText}>{text}</Text>
      </View>
    </Window>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};
