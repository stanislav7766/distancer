import React, {Fragment, useState, useEffect} from 'react';
import {Text, Animated, View} from 'react-native';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {Row, Column} from '../../constants/styles';
import IconSwitch1 from '../svg-icons/icon-switch/IconSwitch1';
import {styleIcon, styleBtn, styleSwitch, styleTextAlign, styleTextColor} from './styles';

const DoubleBtn = ({style, textL, textR, value, onPress}) => {
  const {accentColor, colorL, colorR, backgroundColor} = style;
  const [btnX] = useState(new Animated.Value(0));
  const [btnXX] = useState(new Animated.Value(0));
  const RotateData = btnXX.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const IconSwitchWrap = (
    <Animated.View style={{transform: [{translateX: btnX, rotate: RotateData}]}}>
      <IconSwitch1 width={155 / 2} height={46} fill={accentColor} />
    </Animated.View>
  );

  useEffect(() => {
    Animated.timing(btnX, {
      duration: 200,
      toValue: value ? 155 / 2 : 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(btnXX, {
      duration: 200,
      toValue: value ? 0.5 : 0,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const Btns = (
    <Fragment>
      <View
        style={[
          styleSwitch,
          {
            left: btnX.__getValue(),
          },
        ]}
      >
        {IconSwitchWrap}
      </View>
      <Row>
        <Column alignItems={'flex-start'}>
          <Text style={[styleBtn, styleTextAlign('left'), styleTextColor(colorL)]}>{textL}</Text>
        </Column>

        <Column alignItems={'flex-end'}>
          <Text style={[styleBtn, styleTextAlign('right'), styleTextColor(colorR)]}>{textR}</Text>
        </Column>
      </Row>
    </Fragment>
  );
  return <RoundedIcon style={[styleIcon, {backgroundColor}]} onPress={onPress} IconComponent={Btns} />;
};
export default DoubleBtn;
