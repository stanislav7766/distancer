import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';

const Touchable = ({Child, withFeedback, onPress}) =>
  withFeedback ? (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {Child}
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback style={styles.touchable} onPress={onPress}>
      <View>{Child}</View>
    </TouchableWithoutFeedback>
  );

Touchable.defaultProps = {
  withFeedback: true,
};

export default Touchable;
