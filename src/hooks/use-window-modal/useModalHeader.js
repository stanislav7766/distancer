import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {themeContext} from '../../contexts/contexts';
import Window from '../../componets/window/Window';
import {styles, windowWidth} from './styles';

export const useModalHeader = ({text, preset, onClose}) => {
  const [shownWindow, setShowWindow] = useState(false);
  const {getThemeStyle, theme} = useContext(themeContext);

  const themeStyle = getThemeStyle(theme);

  const onHideWindow = () => {
    setShowWindow(false);
  };
  const onShowWindow = () => {
    setShowWindow(true);
  };

  const closeWindow = () => {
    onClose();
    onHideWindow();
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={closeWindow}
      maskColor="#8D8D8D"
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
