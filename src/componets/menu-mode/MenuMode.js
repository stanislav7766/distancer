import React, {Fragment, useRef, useContext, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {themeContext} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import Item from '../item/Item';
import IconSwitch from '../svg-icons/icon-switch/IconSwitch';
import IconDot from '../svg-icons/icon-dot/IconDot';
import {Row, Column, styleWrap, Styles} from './styles';
import {THEMES} from '../../constants/constants';

const MenuMode = ({themeStyle}) => {
  const {theme, setTheme} = useContext(themeContext);
  const {styleItem} = Styles(themeStyle);
  const iconThemeX = useRef(new Animated.Value(theme === 'light' ? 0 : 30)).current;
  const iconThemeXX = useRef(new Animated.Value(theme === 'light' ? 0 : 3.15)).current;
  const RotateData = iconThemeXX.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    Animated.timing(iconThemeX, {
      duration: 200,
      toValue: theme === 'light' ? 0 : 30,
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
      <IconSwitch width={50} height={37} fill1={themeStyle.accentColor} fill2={themeStyle.backgroundColorSecondary} />
    </Animated.View>
  );

  const onPressTheme = () => setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  const styleIcon = {
    position: 'relative',
    width: 80,
    height: 37,
    alignItems: 'flex-start',
    top: 10,
    left: iconThemeX.__getValue(),
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  return (
    <Fragment>
      <Row>
        <Column alignItems={'flex-start'}>
          <RoundedIcon style={styleIcon} onPress={onPressTheme} IconComponent={IconSwitchWrap} />
        </Column>
      </Row>
      <View style={styleWrap}>
        <Item style={styleItem} IconComponent={IconDotWrap} text={'Import Route'} />
      </View>
      <View style={styleWrap}>
        <Item style={styleItem} IconComponent={IconDotWrap} text={'Export All'} />
      </View>
    </Fragment>
  );
};

export default MenuMode;
