import React from 'react';
import {Image, Text, View} from 'react-native';
import defaultImg from '../../assets/avatar.png';
import {Row} from '../../constants/styles';
import {titleDefaultStyle} from './styles';

const Avatar = ({src, size, title, titleStyle}) => {
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size * 0.5,
  };

  return (
    <View>
      <Row marginLeft={'0px'} marginRight={'0px'}>
        <Image style={containerStyle} source={src ? {uri: src} : defaultImg} />
      </Row>
      {title && (
        <Row marginLeft={'0px'} marginRight={'0px'}>
          <Text style={titleStyle ? titleStyle : titleDefaultStyle}>{title}</Text>
        </Row>
      )}
    </View>
  );
};
export default Avatar;
