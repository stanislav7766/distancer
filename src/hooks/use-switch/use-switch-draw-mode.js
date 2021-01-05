import React, {useContext, useState} from 'react';
import {themeContext} from '../../contexts/contexts';
import useSvgFactory from '../use-svg-factory';
import {getDotsMode} from '../../assets/svg-icons/dots-mode';
import {getLinesMode} from '../../assets/svg-icons/lines-mode';
import Switch from '../../componets/switch';
import {getDrawModeStyles, switchDrawModeSize} from './styles';

const dotsSvgParams = {width: 25, height: 30, fillAccent: '#fff'};
const linesSvgParams = {width: 35, height: 20, fillAccent: '#fff'};

export const useSwitchDrawMode = () => {
  const [modeSwitched, setModeSwitched] = useState(false);
  const {theme, getThemeStyle} = useContext(themeContext);
  const themeStyle = getThemeStyle(theme);

  const LinesIcon = useSvgFactory(getDotsMode, dotsSvgParams);
  const DotsIcon = useSvgFactory(getLinesMode, linesSvgParams);

  const onTrue = () => {
    setModeSwitched(true);
  };
  const onFalse = () => {
    setModeSwitched(false);
  };

  const {trueStyle, falseStyle} = getDrawModeStyles(themeStyle);

  const renderSwitch = () => (
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
  );
  return [renderSwitch(), modeSwitched, renderSwitch];
};
