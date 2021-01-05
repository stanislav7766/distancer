import React, {useContext} from 'react';
import {themeContext} from '../../contexts/contexts';
import Switch from '../../componets/switch';
import {getCommonStyles, switchCommonSize} from './styles';

export const useSwitchCommon = () => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const themeStyle = getThemeStyle(theme);
  const isOn = false;

  const onCommonTrue = () => {};
  const onCommonFalse = () => {};

  const {trueStyle, falseStyle} = getCommonStyles(themeStyle);

  const renderSwitch = () => (
    <Switch
      withIcons={false}
      sizes={switchCommonSize}
      initialPosition={isOn}
      onFalse={onCommonFalse}
      onTrue={onCommonTrue}
      falseStyle={falseStyle}
      trueStyle={trueStyle}
    />
  );
  return [renderSwitch(), renderSwitch];
};
