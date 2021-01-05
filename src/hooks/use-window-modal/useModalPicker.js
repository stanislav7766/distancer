import React, {useState, useEffect, useContext} from 'react';
import WheelPicker from '../../componets/wheel-picker/WheelPicker';
import Window from '../../componets/window/Window';
import {themeContext} from '../../contexts/contexts';
import {isEmpty} from '../../utils/validation/validator';
import {styles, pickerSizes, windowWidth} from './styles';

const isItemInArray = (arr, item) => arr.includes(item);

export const useModalPicker = ({pickerItems, mode, setSelectedItems, selectedItems, defaultItem}) => {
  const [shownWindow, setShowWindow] = useState(false);
  const {getThemeStyle, theme} = useContext(themeContext);

  const themeStyle = getThemeStyle(theme);
  const firstItem = defaultItem || (pickerItems[0]?.value ?? '');
  const [selectedItem, setSelectedItem] = useState(firstItem);

  useEffect(() => {
    setSelectedItem(firstItem);
  }, [firstItem]);

  const Picker = (
    <WheelPicker
      textStyle={styles.pickerText}
      backgroundColor={themeStyle.backgroundColor}
      sizes={pickerSizes}
      items={pickerItems}
      selectedValue={selectedItem}
      onValueChange={val => {
        setSelectedItem(val);
      }}
    />
  );
  const onHideWindow = () => {
    setShowWindow(false);
  };
  const onShowWindow = () => {
    setShowWindow(true);
  };
  const isSingle = mode === 'single';
  const allowUpdate = !isItemInArray(selectedItems, selectedItem) && !isEmpty(selectedItem);

  const closeWindow = () => {
    allowUpdate && (isSingle ? setSelectedItems([selectedItem]) : setSelectedItems([...selectedItems, selectedItem]));
    onHideWindow();
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset="check"
      closeWindow={closeWindow}
      maskColor="#8D8D8D"
      backgroundColor={themeStyle.backgroundColor}
      width={windowWidth}
    >
      {Picker}
    </Window>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};
