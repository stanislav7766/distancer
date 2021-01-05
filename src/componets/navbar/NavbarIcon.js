import React from 'react';
import useSvgFactory from '../../hooks/use-svg-factory';
import {TextTitle} from './styles';

const navbarIconsParams = {width: 22, height: 20};

const NavbarIcon = ({getXml, fillAccent, title}) => (
  <>
    {useSvgFactory(getXml, {...navbarIconsParams, fillAccent})}
    <TextTitle color={fillAccent}>{title}</TextTitle>
  </>
);

export default NavbarIcon;
