import React, {useMemo} from 'react';
import {SvgXml} from 'react-native-svg';

const useSvgFactory = (getSvg, params) => useMemo(() => <SvgXml xml={getSvg(params)} />, [getSvg, params]);

export default useSvgFactory;
