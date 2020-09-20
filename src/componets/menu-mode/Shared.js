import React, {Fragment, useState, useRef, useContext, useEffect} from 'react';
import {View, Animated, Switch, Text} from 'react-native';
import {themeContext} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import Item from '../item/Item';
import IconSwitch from '../svg-icons/icon-switch/IconSwitch';
import IconDot from '../svg-icons/icon-dot/IconDot';
import {Row, Column, styleWrap, Styles} from './styles';
import {THEMES} from '../../constants/constants';
import {Form} from '../../constants/styles';

const Shared = ({themeStyle, navigator}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const onChangeEnabled = () => setIsEnabled(!isEnabled);

  const {theme, setTheme} = useContext(themeContext);
  const {styleItem, appSettingsStyle} = Styles(themeStyle);
  const iconThemeX = useRef(new Animated.Value(theme === 'light' ? -5 : 25)).current;
  const iconThemeXX = useRef(new Animated.Value(theme === 'light' ? 0 : 3.15)).current;
  const RotateData = iconThemeXX.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    Animated.timing(iconThemeX, {
      duration: 200,
      toValue: theme === 'light' ? -5 : 25,
      useNativeDriver: true,
    }).start();
    Animated.timing(iconThemeXX, {
      duration: 200,
      toValue: theme === 'light' ? 0 : 0.5,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const IconDotWrap = <IconDot width={16} height={16} fill={themeStyle.accentColor} />;

  const IconSwitchWrap = (
    <Animated.View style={{transform: [{translateX: iconThemeX, rotate: RotateData}]}}>
      <IconSwitch width={40} height={27} fill1={themeStyle.accentColor} fill2={themeStyle.backgroundColorSecondary} />
    </Animated.View>
  );

  const onPressTheme = () => setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  const styleIcon = {
    position: 'relative',
    width: 60,
    height: 27,
    alignItems: 'flex-start',
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  const AppSettingsGroup = (
    <Form backgroundColor={themeStyle.backgroundColor}>
      <Row>
        <Text style={appSettingsStyle}>App settings</Text>
      </Row>
      <Row>
        <Column alignItems={'flex-end'}>
          <RoundedIcon style={styleIcon} onPress={onPressTheme} IconComponent={IconSwitchWrap} />
        </Column>
      </Row>
      <Row marginTop={10}>
        <Column>
          <Row marginRight={'0px'} marginLeft={'0px'}>
            <Column alignItems="flex-start">
              <Text style={appSettingsStyle}>Auto pause activity</Text>
            </Column>
            <Column alignItems="flex-end">
              <Switch
                trackColor={{false: '#474747', true: '#474747'}}
                thumbColor={isEnabled ? themeStyle.accentColor : themeStyle.textColorSecondary}
                onValueChange={onChangeEnabled}
                value={isEnabled}
              />
            </Column>
          </Row>
          <Row marginRight={'0px'} marginLeft={'0px'}>
            <Column alignItems="flex-start">
              <Text style={appSettingsStyle}>Auto sync activities</Text>
            </Column>
            <Column alignItems="flex-end">
              <Switch
                trackColor={{false: '#474747', true: '#474747'}}
                thumbColor={isEnabled ? themeStyle.accentColor : themeStyle.textColorSecondary}
                onValueChange={onChangeEnabled}
                value={isEnabled}
              />
            </Column>
          </Row>
          <Row marginRight={'0px'} marginLeft={'0px'}>
            <Column alignItems="flex-start">
              <Text style={appSettingsStyle}>Auto sync routes</Text>
            </Column>
            <Column alignItems="flex-end">
              <Switch
                trackColor={{false: '#474747', true: '#474747'}}
                thumbColor={isEnabled ? themeStyle.accentColor : themeStyle.textColorSecondary}
                onValueChange={onChangeEnabled}
                value={isEnabled}
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </Form>
  );

  return (
    <Fragment>
      <Row marginTop={10}>{AppSettingsGroup}</Row>
      <Row>
        <View style={styleWrap}>
          <Item style={styleItem} IconComponent={IconDotWrap} text={'Offline Maps'} />
        </View>
      </Row>
    </Fragment>
  );
};

export default Shared;
