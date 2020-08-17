import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {stylesLiveInfoForm, stylesLiveInfoText, stylesLiveInfoSubText} from './styles';

const LiveInfo = ({onPress, style, title, subTitle}) => {
  const {width, height, backgroundColor, color, borderRadius, elevation} = style;
  const a = {};
  borderRadius && (a.borderRadius = borderRadius);
  elevation && (a.elevation = elevation);

  return (
    <View style={[stylesLiveInfoForm, {width, height, backgroundColor}, a]} onStartShouldSetResponder={onPress}>
      <Text style={[stylesLiveInfoText, {color}]} textColor={color}>
        {title}
      </Text>
      <Text style={[stylesLiveInfoSubText, {color}]} textColor={color}>
        {subTitle}
      </Text>
    </View>
  );
};
export default LiveInfo;
