import React from 'react';
import useSvgFactory from '../use-svg-factory';
import {useTheme} from '../../stores/theme';
import {getMoon} from '../../assets/svg-icons/moon';
import {getSun} from '../../assets/svg-icons/sun';
import Switch from '../../componets/switch';
import {getThemeStyles, switchThemeSize, isLightTheme} from './styles';
import {THEMES} from '../../constants/constants';

const moonSvgParams = {width: 10, height: 10, fillAccent: '#fff'};
const sunSvgParams = {width: 12, height: 12, fillAccent: '#fff'};

export const useSwitchTheme = () => {
  const {theme, setTheme, themeStyle} = useTheme();

  const MoonIcon = useSvgFactory(getMoon, moonSvgParams);
  const sunIcon = useSvgFactory(getSun, sunSvgParams);

  const isOn = isLightTheme(theme);

  const onThemeTrue = () => {
    setTheme(THEMES.LIGHT);
  };
  const onThemeFalse = () => {
    setTheme(THEMES.DARK);
  };

  const {trueStyle, falseStyle} = getThemeStyles(themeStyle);

  const renderSwitch = () => (
    <Switch
      withIcons
      sizes={switchThemeSize}
      initialPosition={isOn}
      onFalse={onThemeFalse}
      onTrue={onThemeTrue}
      falseStyle={falseStyle}
      trueStyle={trueStyle}
      FalseIcon={MoonIcon}
      TrueIcon={sunIcon}
    />
  );
  return [renderSwitch(), renderSwitch];
};
