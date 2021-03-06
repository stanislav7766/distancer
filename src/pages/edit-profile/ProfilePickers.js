import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {
  GET_HEIGHT_PICKER_ITEMS,
  GET_WEIGHT_PICKER_ITEMS,
  GET_GENDER_PICKER_ITEMS,
  DEFAULT_WEIGHT,
  DEFAULT_HEIGHT,
  DEFAULT_GENDER,
} from '~/constants/constants';
import {Styles, Row, Column, ContainerPickers, pickerTextStyle, mt10} from './styles';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const pickerItems = type =>
  ({
    height: GET_HEIGHT_PICKER_ITEMS(papyrusify('editProfile.designation')),
    weight: GET_WEIGHT_PICKER_ITEMS(papyrusify('editProfile.designation')),
    gender: GET_GENDER_PICKER_ITEMS(papyrusify('editProfile.designation')),
  }[type]);

const defaultItem = type =>
  ({
    height: DEFAULT_HEIGHT,
    weight: DEFAULT_WEIGHT,
    gender: DEFAULT_GENDER,
  }[type]);

const ProfilePickers = ({themeStyle, profile, setProfile}) => {
  const {grayColor, orangeColor} = Styles(themeStyle);
  const {setInit, onShowPicker} = usePicker();
  const {gender, weight, height} = profile;

  const selectPicker = type => {
    setInit({
      pickerItems: pickerItems(type),
      selectedItems: [profile[type]],
      defaultItem: profile[type] || defaultItem(type),
      setSelectedItems: ([value]) => {
        setProfile(old => ({...old, [type]: value}));
      },
    });
    onShowPicker();
  };

  return (
    <ContainerPickers>
      <TouchableOpacity onPress={() => selectPicker('gender')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>{papyrusify('editProfile.input.gender')}</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>
              {papyrusify(`editProfile.designation.${gender.toLowerCase()}`)}
            </Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('height')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>{papyrusify('editProfile.input.height')}</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>
              {height} {papyrusify('editProfile.designation.cm')}
            </Text>
          </Column>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectPicker('weight')}>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={[pickerTextStyle, grayColor]}>{papyrusify('editProfile.input.weight')}</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <Text style={[pickerTextStyle, orangeColor]}>
              {weight} {papyrusify('editProfile.designation.kgs')}
            </Text>
          </Column>
        </Row>
      </TouchableOpacity>
    </ContainerPickers>
  );
};
export default ProfilePickers;
