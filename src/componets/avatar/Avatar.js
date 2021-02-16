import React from 'react';
import {Image, Text, View} from 'react-native';
import defaultImg from '~/assets/avatar.png';
import {titleDefaultStyle, getAvatarStyle, Row, mx0} from './styles';

const Avatar = ({src, size, title, titleStyle}) => {
  const avatarStyle = getAvatarStyle(size);
  return (
    <View>
      <Row {...mx0}>
        <Image style={avatarStyle} source={src ? {uri: src} : defaultImg} />
      </Row>
      {title && (
        <Row {...mx0}>
          <Text style={[titleDefaultStyle, titleStyle]}>{title}</Text>
        </Row>
      )}
    </View>
  );
};
export default Avatar;
