import React from 'react';
import {useTheme} from '../../stores/theme';
import Switch from '../../componets/switch';
import {getCommonStyles, switchCommonSize} from './styles';

export const useSwitchCommon = () => {
  const {themeStyle} = useTheme();
  const isOn = false;

  const onCommonTrue = () => {};
  const onCommonFalse = () => {};

  const {trueStyle, falseStyle} = getCommonStyles(themeStyle);

  const renderSwitch = ({onTrue, onFalse, position}) => (
    <Switch
      withIcons={false}
      sizes={switchCommonSize}
      initialPosition={position}
      onFalse={onFalse}
      onTrue={onTrue}
      falseStyle={falseStyle}
      trueStyle={trueStyle}
    />
  );
  const CommonSwitch = renderSwitch({onTrue: onCommonTrue, onFalse: onCommonFalse, position: isOn});
  return [CommonSwitch, renderSwitch];
};
