import React from 'react';
import {SvgXml} from 'react-native-svg';
import {getXml} from './styles';

const IconSwitch = ({fill1, fill2, width, height}) => {
  const xml = getXml({fill1, fill2, width, height});
  return <SvgXml xml={xml} />;
};

export default IconSwitch;
