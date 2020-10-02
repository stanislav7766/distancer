import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {DEFAULT_GENDER, DEFAULT_HEIGHT, DEFAULT_WEIGHT} from '../../constants/constants';
import {Styles, Row, Column} from './styles';

const ProfilePickers = ({themeStyle, profile, selectPicker}) => {
  const {pickerTextStyle, grayColor, orangeColor} = Styles(themeStyle);
  const {gender, weight, height} = profile;

  return (
    <>
      <TouchableOpacity onPress={() => selectPicker('gender')}>
        <Row marginTop={10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Gender</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{gender}</Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('height')}>
        <Row marginTop={10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Height</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{height} cm</Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('weight')}>
        <Row marginTop={10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Weight</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{weight} kgs</Text>
          </Column>
        </Row>
      </TouchableOpacity>
    </>
  );
};
export default ProfilePickers;
