import React from 'react';
import {Text} from 'react-native';
import {useSwitchTheme} from '../../hooks/use-switch';
import {Row, Column, Styles, mx0, mt10, mb30, orangeColor} from './styles';
import Touchable from '../../componets/touchable/Touchable';
import {Form} from '../../constants/styles';

const Shared = ({themeStyle, navigator, screenPicker, selectPicker}) => {
  const {appSettingsStyle} = Styles(themeStyle);
  const [SwitchTheme] = useSwitchTheme();

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
                  Child={<Text style={[appSettingsStyle, orangeColor]}>{screenPicker}</Text>}
                  onPress={() => selectPicker('screen')}
                />
              </Column>
            </Row>
          </Column>
        </Row>
      </Form>
    </Row>
  );

  return <>{AppSettingsGroup}</>;
};

export default Shared;
