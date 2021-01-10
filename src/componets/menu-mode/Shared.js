import React from 'react';
import {Text} from 'react-native';
import {useSwitchCommon, useSwitchTheme} from '../../hooks/use-switch';
import {useAppSettings} from '../../stores/app-settings';
import {useRouteSettings} from '../../stores/route-settings';
import {useModalPicker as usePicker} from '../../stores/modal-picker';
import {Row, Column, Styles, mx0, mt10, mb30, orangeColor} from './styles';
import Touchable from '../../componets/touchable/Touchable';
import {Form} from '../../constants/styles';
import {GET_SCREEN_PICKER_ITEMS} from '../../constants/constants';
import {observer} from 'mobx-react-lite';

const Shared = ({themeStyle, navigator}) => {
  const {appSettingsStyle} = Styles(themeStyle);
  const {defaultScreen, setDefaultScreen} = useAppSettings();
  const {dragHints, setDragHints} = useRouteSettings();
  const {setInit, onShowPicker} = usePicker();
  const [SwitchTheme] = useSwitchTheme();
  const [, renderSwitchCommon] = useSwitchCommon();

  const SwitchDragHints = renderSwitchCommon({
    position: dragHints,
    onTrue: () => setDragHints(true),
    onFalse: () => setDragHints(false),
  });

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

  const RouteSettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row>
          <Text style={appSettingsStyle}>Route settings</Text>
        </Row>
        <Row {...mt10}>
          <Column>
            <Row {...mx0}>
              <Column alignItems="flex-start">
                <Text style={appSettingsStyle}>Drag's hints</Text>
              </Column>
              <Column justifyContent="center" alignItems="flex-end">
                {SwitchDragHints}
              </Column>
            </Row>
          </Column>
        </Row>
      </Form>
    </Row>
  );

  const AppSettingsGroup = (
    <Row {...mb30} {...mt10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row>
          <Text style={appSettingsStyle}>App settings</Text>
        </Row>
        <Row {...mt10}>
          <Column>
            <Row {...mx0}>
              <Column alignItems="flex-start">
                <Text style={appSettingsStyle}>Theme</Text>
              </Column>
              <Column justifyContent="center" alignItems="flex-end">
                {SwitchTheme}
              </Column>
            </Row>
            <Row {...mx0}>
              <Column alignItems={'flex-start'}>
                <Text style={appSettingsStyle}>Default screen</Text>
              </Column>
              <Column alignItems={'flex-end'}>
                <Touchable
                  Child={<Text style={[appSettingsStyle, orangeColor]}>{defaultScreen}</Text>}
                  onPress={onSelectDefaultScreen}
                />
              </Column>
            </Row>
          </Column>
        </Row>
      </Form>
    </Row>
  );

  return (
    <>
      {RouteSettingsGroup}
      {AppSettingsGroup}
    </>
  );
};

export default observer(Shared);
