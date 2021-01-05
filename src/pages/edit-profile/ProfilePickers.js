import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Styles, Row, Column, ContainerPickers, pickerTextStyle, mt10} from './styles';

const ProfilePickers = ({themeStyle, profile, selectPicker}) => {
  const {grayColor, orangeColor} = Styles(themeStyle);
  const {gender, weight, height} = profile;

  return (
    <ContainerPickers>
      <TouchableOpacity onPress={() => selectPicker('gender')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Gender</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{gender}</Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('height')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Height</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{height} cm</Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('weight')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>Weight</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>{weight} kgs</Text>
          </Column>
        </Row>
      </TouchableOpacity>
    </ContainerPickers>
  );
};
export default ProfilePickers;
