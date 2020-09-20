import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {stylesBtnForm, stylesBtnText, Row, Column} from './styles';
import IconGoogle from '../svg-icons/icon-google/IconGoogle';

const GoogleSignBtn = ({title, style, onPress}) => {
  const {height} = style;
  const IconGoogleWrap = <IconGoogle width={28} height={28} />;
  return (
    <TouchableOpacity style={[stylesBtnForm, style]} onPress={onPress}>
      <Row>
        <Column
          alignItems="center"
          borderBottomLeftRadius={15}
          borderTopLeftRadius={15}
          backgroundColor={'#fff'}
          height={height}
          width={'10%'}
        >
          {IconGoogleWrap}
        </Column>
        <Column alignItems="center" width={'90%'}>
          <Text style={stylesBtnText} textColor={'fff'}>
            {title}
          </Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};
export default GoogleSignBtn;
