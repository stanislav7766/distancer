import React from 'react';
import {SvgXml} from 'react-native-svg';

const useSvgFactory = (getSvg, params) => <SvgXml xml={getSvg(params)} />;

export default useSvgFactory;
