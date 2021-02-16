import React, {useCallback, useState} from 'react';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getDotsMode} from '~/assets/svg-icons/dots-mode';
import {getLinesMode} from '~/assets/svg-icons/lines-mode';
import Switch from '~/componets/switch';
import {getDrawModeStyles, switchDrawModeSize} from '../styles';
import {useTheme} from '~/stores/theme';

const dotsSvgParams = {width: 25, height: 30, fillAccent: '#fff'};
const linesSvgParams = {width: 35, height: 20, fillAccent: '#fff'};

export const useSwitchDrawMode = () => {
  const [modeSwitched, setModeSwitched] = useState(false);
  const {themeStyle} = useTheme();

  const LinesIcon = useSvgFactory(getDotsMode, dotsSvgParams);
  const DotsIcon = useSvgFactory(getLinesMode, linesSvgParams);

  const onTrue = useCallback(() => {
    setModeSwitched(true);
  }, []);
  const onFalse = useCallback(() => {
    setModeSwitched(false);
  }, []);

  const {trueStyle, falseStyle} = getDrawModeStyles(themeStyle);

  const renderSwitch = useCallback(
    () => (
      <Switch
        withIcons
        sizes={switchDrawModeSize}
        initialPosition={modeSwitched}
        onFalse={onFalse}
        onTrue={onTrue}
        falseStyle={falseStyle}
        trueStyle={trueStyle}
        FalseIcon={LinesIcon}
        TrueIcon={DotsIcon}
      />
    ),
    [DotsIcon, LinesIcon, falseStyle, modeSwitched, onFalse, onTrue, trueStyle],
  );
  return [renderSwitch(), modeSwitched, renderSwitch];
};
