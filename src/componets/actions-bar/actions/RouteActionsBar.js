import React from 'react';
import {RoundedIcon} from '~/componets/rounded-icon';
import {SelectAction} from '../SelectAction';
import {Styles, styles} from '../styles';
import {ACTIONS_MODE} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';

const {SAVE, CONTINUE} = ACTIONS_MODE;

const RouteActionsBar = ({themeStyle, onPressSave, onPressContinue}) => {
  const {savedIcon, continueIcon} = Styles(themeStyle);
  const defineColor = themeStyle.accentColor;

  const IconSaveWrap = <SelectAction mode={SAVE} color={defineColor} />;
  const IconContinueWrap = <SelectAction mode={CONTINUE} color={defineColor} />;
  const Actions = (
    <>
      <RoundedIcon style={savedIcon} IconComponent={IconSaveWrap} onPress={onPressSave} />
      <RoundedIcon style={continueIcon} IconComponent={IconContinueWrap} onPress={onPressContinue} />
    </>
  );

  return <View style={styles.styleActions}>{Actions}</View>;
};

export default observer(RouteActionsBar);
