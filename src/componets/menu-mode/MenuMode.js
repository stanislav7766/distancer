import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {appModeContext} from '../../contexts/contexts';
import Shared from './Shared';
import NotAuthorized from './NotAuthorized';
import {useModalPicker} from '../../hooks/use-window-modal';
import Authorized from './Authorized';
import {scrollViewStyle} from './styles';
import {APP_MODE} from '../../constants/constants';

const {VIEW_ROUTE, ...restAppModes} = APP_MODE;

const defaultPickerValue = type =>
  ({
    timer: '1',
    screen: 'View',
  }[type]);

const screenPicker = () => Object.values(restAppModes).map(text => ({label: text, value: text}));
const timerPicker = () => new Array(10).fill(0).map((_, i) => ({label: `${i + 1} sec`, value: `${i + 1}`}));

const itemsPicker = type =>
  ({
    timer: timerPicker(),
    screen: screenPicker(),
  }[type]);

const MenuMode = ({themeStyle, navigator}) => {
  const {auth, setDefaultAuth} = useContext(appModeContext);
  const {authorized} = auth;
  const [pickerMode, setPickerMode] = useState('timer');

  const [selectedPickers, setSelectedPickers] = useState({
    timer: defaultPickerValue('timer'),
    screen: defaultPickerValue('screen'),
  });

  const onValueChange = ([value]) => {
    setSelectedPickers(old => ({...old, [pickerMode]: value}));
  };

  const [ModalPicker, onShowModalPicker] = useModalPicker({
    pickerItems: itemsPicker(pickerMode),
    selectedItems: selectedPickers[pickerMode],
    setSelectedItems: onValueChange,
    mode: 'single',
  });

  const selectPicker = type => {
    setPickerMode(type);
    onShowModalPicker();
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={scrollViewStyle}>
        {authorized ? (
          <Authorized
            setDefaultAuth={setDefaultAuth}
            themeStyle={themeStyle}
            navigator={navigator}
            timerPicker={selectedPickers.timer}
            selectPicker={selectPicker}
          />
        ) : (
          <NotAuthorized themeStyle={themeStyle} navigator={navigator} />
        )}
        <Shared
          themeStyle={themeStyle}
          navigator={navigator}
          screenPicker={selectedPickers.screen}
          selectPicker={selectPicker}
        />
      </ScrollView>
      {ModalPicker}
    </>
  );
};

export default MenuMode;
