import React from 'react';
import {useSwitchTheme} from '~/hooks/use-switch';
import {useAppSettings} from '~/stores/app-settings';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {orangeColor} from '../styles';
import {Touchable} from '~/componets/touchable';
import {FormGroup, GroupText} from '~/componets/form-group';
import {GET_SCREEN_PICKER_ITEMS} from '~/constants/constants';
import {useTheme} from '~/stores/theme';
import {observer} from 'mobx-react-lite';

const GroupApp = () => {
  const {themeStyle} = useTheme();
  const {defaultScreen, setDefaultScreen} = useAppSettings();
  const {setInit, onShowPicker} = usePicker();

  const [ThemeSwith] = useSwitchTheme();

  const ThemeText = <GroupText title="Theme" themeStyle={themeStyle} />;
  const DefaultScreenText = <GroupText title="Default Screen" themeStyle={themeStyle} />;
  const DefaultScreenValue = <GroupText title={defaultScreen} style={orangeColor} themeStyle={themeStyle} />;

  const onChangeDefaultScreen = ([value]) => {
    setDefaultScreen(value);
  };
  const onSelectDefaultScreen = () => {
    setInit({
      pickerItems: GET_SCREEN_PICKER_ITEMS(),
      selectedItems: [defaultScreen],
      defaultItem: defaultScreen,
      setSelectedItems: onChangeDefaultScreen,
    });
    onShowPicker();
  };

  const DefaultScreenPicker = <Touchable Child={DefaultScreenValue} onPress={onSelectDefaultScreen} />;

  const appSettingsItems = [
    {Left: ThemeText, Right: ThemeSwith},
    {Left: DefaultScreenText, Right: DefaultScreenPicker},
  ];

  const AppSettingsGroup = <FormGroup items={appSettingsItems} themeStyle={themeStyle} title="App settings" />;

  return <>{AppSettingsGroup}</>;
};

export const AppGroup = observer(GroupApp);
