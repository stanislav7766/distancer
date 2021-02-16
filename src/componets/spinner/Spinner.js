import React from 'react';
import {View, Image} from 'react-native';
import gif from '~/assets/spinner.gif';
import {Styles} from './styles';

const Spinner = ({position}) => {
  const {containerStyle, wrapperStyle, spinnerStyle} = Styles(position);
  return (
    <View style={containerStyle}>
      <View style={wrapperStyle}>
        <Image source={gif} style={spinnerStyle} />
      </View>
    </View>
  );
};

export default Spinner;
