import React from 'react';
import useSvgFactory from '~/hooks/use-svg-factory';
import {RoundedIcon} from '~/componets/rounded-icon';
import {TextTitle, styleIcon, Row, Column, mx0} from './styles';

const navbarIconsParams = {width: 22, height: 20};

const NavbarIcon = ({getXml, fillAccent, title, onPress}) => {
  const IconWrap = (
    <Column>
      <Row {...mx0}>{useSvgFactory(getXml, {...navbarIconsParams, fillAccent})}</Row>
      <Row {...mx0}>
        <TextTitle color={fillAccent}>{title}</TextTitle>
      </Row>
    </Column>
  );
  return (
    <>
      <RoundedIcon style={styleIcon} IconComponent={IconWrap} onPress={onPress} />
    </>
  );
};

export default NavbarIcon;
