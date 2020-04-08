import React from 'react';
import {Wrapper} from './styles';

const RoundedIcon = ({IconComponent, style, onPress}) => (
  <Wrapper
    backgroundColor={style && style.backgroundColor}
    width={style && style.width}
    height={style && style.height}
    top={style && style.top}
    bottom={style && style.bottom}
    right={style && style.right}
    left={style && style.left}
    position={style && style.position}
    onPress={onPress}
  >
    {IconComponent}
  </Wrapper>
);

export default RoundedIcon;
