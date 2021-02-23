import React, {memo} from 'react';
import {View, Image} from 'react-native';
import gif from '~/assets/spinner.gif';
import {isEqualJson} from '~/utils/validation/helpers';
import {Styles} from './styles';

const Spinner = ({position, themeStyle}) => {
  const {containerStyle, wrapperStyle, spinnerStyle} = Styles({position, themeStyle});
  return (
    <View style={containerStyle}>
      <View style={wrapperStyle}>
        <Image source={gif} style={spinnerStyle} />
      </View>
    </View>
  );
};
const onUpdate = (prev, next) => isEqualJson(prev, next);

export default memo(Spinner, onUpdate);
