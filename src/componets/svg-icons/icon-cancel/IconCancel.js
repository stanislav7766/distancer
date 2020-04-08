import React from 'react';
import {SvgXml} from 'react-native-svg';
import {getXml} from './styles';

const IconCancel = ({fill, width, height}) => {
  const xml = getXml({fill, width, height});
  return <SvgXml xml={xml} />;
};

export default IconCancel;
