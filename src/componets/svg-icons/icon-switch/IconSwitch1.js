import React from 'react';
import {SvgXml} from 'react-native-svg';
import {getXml1} from './styles';

const IconSwitch1 = ({fill, width, height}) => {
  const xml = getXml1({fill, width, height});
  return <SvgXml xml={xml} />;
};

export default IconSwitch1;
