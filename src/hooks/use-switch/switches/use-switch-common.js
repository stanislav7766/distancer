import React, {useCallback} from 'react';
import {useTheme} from '~/stores/theme';
import Switch from '~/componets/switch';
import {getCommonStyles, switchCommonSize} from '../styles';

const onCommonTrue = () => {};
const onCommonFalse = () => {};

export const useSwitchCommon = () => {
  const {themeStyle} = useTheme();
  const isOn = false;

  const {trueStyle, falseStyle} = getCommonStyles(themeStyle);

  const renderSwitch = useCallback(
    ({onTrue, onFalse, position}) => (
      <Switch
        withIcons={false}
        sizes={switchCommonSize}
        initialPosition={position}
        onFalse={onFalse}
        onTrue={onTrue}
        falseStyle={falseStyle}
        trueStyle={trueStyle}
      />
    ),
    [falseStyle, trueStyle],
  );
  const CommonSwitch = renderSwitch({onTrue: onCommonTrue, onFalse: onCommonFalse, position: isOn});
  return [CommonSwitch, renderSwitch];
};
