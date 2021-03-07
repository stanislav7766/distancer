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
  const LanguageText = <GroupText title={papyrusify('menuMode.preference.language')} themeStyle={themeStyle} />;
  const LanguageValue = (
    <GroupText title={papyrusify('menuMode.picker.language')} style={orangeColor} themeStyle={themeStyle} />
  );
  const DefaultScreenValue = <GroupText title={defaultScreen} style={orangeColor} themeStyle={themeStyle} />;

  const onChangeDefaultScreen = ([value]) => {
    setDefaultScreen(value);
  };
  const onChangeLanguage = ([value]) => {
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
  const onSelectLanguage = () => {
    setInit({
      pickerItems: GET_LOCALES_ITEMS(),
      selectedItems: [locale],
      defaultItem: locale,
      setSelectedItems: onChangeLanguage,
    });
    onShowPicker();
  };

  const DefaultScreenPicker = <Touchable Child={DefaultScreenValue} onPress={onSelectDefaultScreen} />;
  const LanguagePicker = <Touchable Child={LanguageValue} onPress={onSelectLanguage} />;

  const authItems = authorized ? [{Left: DefaultScreenText, Right: DefaultScreenPicker}] : [];
  const sharedItems = [
    {Left: ThemeText, Right: ThemeSwith},
    {Left: LanguageText, Right: LanguagePicker},
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
