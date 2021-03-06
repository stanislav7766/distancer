import React from 'react';
import {useSwitchTheme} from '~/hooks/use-switch';
import {useAppSettings} from '~/stores/app-settings';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {orangeColor} from '../styles';
import {Touchable} from '~/componets/touchable';
import {FormGroup, GroupText} from '~/componets/form-group';
import {GET_LOCALES_ITEMS, GET_SCREEN_PICKER_ITEMS} from '~/constants/constants';
import {useTheme} from '~/stores/theme';
import {useAuth} from '~/stores/auth';
import {observer} from 'mobx-react-lite';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const GroupApp = () => {
  const {themeStyle} = useTheme();

  const {defaultScreen, setDefaultScreen, setLocale, locale} = useAppSettings();
  const {setInit, onShowPicker} = usePicker();
  const {authorized} = useAuth();

  const [ThemeSwith] = useSwitchTheme();

  const ThemeText = <GroupText title={papyrusify('menuMode.preference.theme')} themeStyle={themeStyle} />;
  const DefaultScreenText = (
    <GroupText title={papyrusify('menuMode.preference.defaultScreen')} themeStyle={themeStyle} />
  );
  const LenguageText = <GroupText title={papyrusify('menuMode.preference.lenguage')} themeStyle={themeStyle} />;
  const LenguageValue = (
    <GroupText title={papyrusify('menuMode.picker.lenguage')} style={orangeColor} themeStyle={themeStyle} />
  );
  const DefaultScreenValue = <GroupText title={defaultScreen} style={orangeColor} themeStyle={themeStyle} />;

  const onChangeDefaultScreen = ([value]) => {
    setDefaultScreen(value);
  };
  const onChangeLenguage = ([value]) => {
    setLocale(value);
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
  const onSelectLenguage = () => {
    setInit({
      pickerItems: GET_LOCALES_ITEMS(),
      selectedItems: [locale],
      defaultItem: locale,
      setSelectedItems: onChangeLenguage,
    });
    onShowPicker();
  };

  const DefaultScreenPicker = <Touchable Child={DefaultScreenValue} onPress={onSelectDefaultScreen} />;
  const LenguagePicker = <Touchable Child={LenguageValue} onPress={onSelectLenguage} />;

  const authItems = authorized ? [{Left: DefaultScreenText, Right: DefaultScreenPicker}] : [];
  const sharedItems = [
    {Left: ThemeText, Right: ThemeSwith},
    {Left: LenguageText, Right: LenguagePicker},
  ];

  const AppSettingsGroup = (
    <FormGroup
      items={[...sharedItems, ...authItems]}
      themeStyle={themeStyle}
      title={papyrusify('menuMode.title.appSettings')}
    />
  );

  return <>{AppSettingsGroup}</>;
};

export const AppGroup = observer(GroupApp);
