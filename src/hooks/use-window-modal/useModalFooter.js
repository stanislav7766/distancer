import React, {useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {themeContext} from '../../contexts/contexts';
import Window from '../../componets/window/Window';
import {styles, windowWidth} from './styles';

export const useModalFooter = ({text, preset, onBottomNo, onBottomYes}) => {
  const [shownWindow, setShowWindow] = useState(false);
  const {getThemeStyle, theme} = useContext(themeContext);

  const themeStyle = getThemeStyle(theme);

  const onHideWindow = () => {
    setShowWindow(false);
  };
  const onShowWindow = () => {
    setShowWindow(true);
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={onHideWindow}
      onBottomYes={onBottomYes}
      onBottomNo={onBottomNo}
      maskColor="#8d8d8d"
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
