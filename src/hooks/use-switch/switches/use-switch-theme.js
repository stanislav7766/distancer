import React, {useCallback} from 'react';
import useSvgFactory from '~/hooks/use-svg-factory';
import {useTheme} from '~/stores/theme';
import {getMoon} from '~/assets/svg-icons/moon';
import {getSun} from '~/assets/svg-icons/sun';
import Switch from '~/componets/switch';
import {getThemeStyles, switchThemeSize, isLightTheme} from '../styles';
import {THEMES} from '~/constants/constants';

const moonSvgParams = {width: 10, height: 10, fillAccent: '#fff'};
const sunSvgParams = {width: 12, height: 12, fillAccent: '#fff'};

export const useSwitchTheme = () => {
  const {theme, setTheme, themeStyle} = useTheme();

  const MoonIcon = useSvgFactory(getMoon, moonSvgParams);
  const sunIcon = useSvgFactory(getSun, sunSvgParams);

  const isOn = isLightTheme(theme);

  const onThemeTrue = useCallback(() => {
    setTheme(THEMES.LIGHT);
  }, [setTheme]);
  const onThemeFalse = useCallback(() => {
    setTheme(THEMES.DARK);
  }, [setTheme]);

  const {trueStyle, falseStyle} = getThemeStyles(themeStyle);

  const renderSwitch = useCallback(
    () => (
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
    ),
    [MoonIcon, falseStyle, isOn, onThemeFalse, onThemeTrue, sunIcon, trueStyle],
  );
  return [renderSwitch(), renderSwitch];
};
