import React from 'react';
import {MAX_HEIGHT, MAX_WEIGHT, DEFAULT_GENDER, DEFAULT_HEIGHT, DEFAULT_WEIGHT} from '../../constants/constants';
import WheelPicker from '../../componets/wheel-picker/WheelPicker';
import {pickerSizes, pickerTextStyle} from './styles';

const heightPicker = () => new Array(MAX_HEIGHT).fill(0).map((_, i) => ({label: `${i + 1} cm`, value: `${i + 1}`}));
const weightPicker = () => new Array(MAX_WEIGHT).fill(0).map((_, i) => ({label: `${i + 1} kgs`, value: `${i + 1}`}));
const genderPicker = () => [{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}];

const RenderPicker = ({setProfile, profile, pickerMode, themeStyle}) => {
  const {gender, weight, height} = profile;

  const onChangeValue = ({value, type}) =>
    setProfile(oldInput => ({
      ...oldInput,
      [type]: value,
    }));

  const WheelPickerProps = {
    sizes: pickerSizes,
    textStyle: pickerTextStyle,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  const renderPicker = ({items, selectedValue, onValueChange}) => (
    <WheelPicker {...WheelPickerProps} items={items} selectedValue={selectedValue} onValueChange={onValueChange} />
  );

  const modeCall = type =>
    ({
      height: {
        items: heightPicker(),
        selectedValue: height || DEFAULT_HEIGHT,
        onValueChange: value => onChangeValue({value, type: 'height'}),
      },
      weight: {
        items: weightPicker(),
        selectedValue: weight || DEFAULT_WEIGHT,
        onValueChange: value => onChangeValue({value, type: 'weight'}),
      },
      gender: {
        items: genderPicker(),
        selectedValue: gender || DEFAULT_GENDER,
        onValueChange: value => onChangeValue({value, type: 'gender'}),
      },
    }[type]);

  const body = modeCall(pickerMode);

  return renderPicker(body);
};
export default RenderPicker;
