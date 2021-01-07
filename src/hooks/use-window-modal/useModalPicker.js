import React, {useState, useEffect} from 'react';
import WheelPicker from '../../componets/wheel-picker/WheelPicker';
import Window from '../../componets/window/Window';
import {useTheme} from '../../stores/theme';
import {isEmpty} from '../../utils/validation/validator';
import {styles, pickerSizes, windowWidth} from './styles';

const isItemInArray = (arr, item) => arr.includes(item);

export const useModalPicker = modalPicker => {
  const {shownWindow, onShowPicker, onHidePicker, init} = modalPicker;
  const {pickerItems, mode, setSelectedItems, selectedItems, defaultItem} = init;
  const {themeStyle} = useTheme();

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const value = defaultItem ?? (isEmpty(pickerItems) ? '' : pickerItems[0]?.value);
    setSelectedItem(value);
  }, [defaultItem, pickerItems]);

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

  const isSingle = mode === 'single';
  const allowUpdate = !isItemInArray(selectedItems, selectedItem) && !isEmpty(selectedItem);

  const closeWindow = () => {
    allowUpdate && (isSingle ? setSelectedItems([selectedItem]) : setSelectedItems([...selectedItems, selectedItem]));
    onHidePicker();
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
  return [ShowWindow, onShowPicker, onHidePicker];
};
