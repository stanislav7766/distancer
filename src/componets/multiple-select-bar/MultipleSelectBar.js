import React from 'react';
import {RoundedIcon} from '~/componets/rounded-icon';
import {SelectAction} from './SelectAction';
import {Styles, Count, Row, Column} from './styles';
import {MULTIPLE_SELECT_MODE} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {useMultipleSelectBar} from '~/stores/multiple-select-bar';
import {Touchable} from '../touchable';

const {MENU, DELETE, CANCEL} = MULTIPLE_SELECT_MODE;

const MultipleSelectBar = ({themeStyle}) => {
  const selectStore = useMultipleSelectBar();
  const {count, showBar} = selectStore;
  const {styleBar} = Styles(themeStyle);
  const defineColor = themeStyle.textColorSecondary;

  const IconCancelWrap = <SelectAction mode={CANCEL} color={defineColor} />;
  const IconDeleteWrap = <SelectAction mode={DELETE} color={defineColor} />;
  const IconMenuWrap = <SelectAction mode={MENU} color={defineColor} />;

  const Bar = (
    <>
      <Row>
        <Column marginLeft={10} flex={0.5} alignItems="flex-end">
          <Touchable Child={IconCancelWrap} onPress={selectStore.onCancel} />
        </Column>
        <Column alignItems="flex-start">
          <Count>{count}</Count>
        </Column>
        <Column alignItems="flex-end">
          <Touchable Child={IconDeleteWrap} onPress={selectStore.onDelete} />
        </Column>
        <Column marginLeft={10} flex={0.5} alignItems="center">
          <Touchable Child={IconMenuWrap} onPress={selectStore.onMenu} />
        </Column>
      </Row>
    </>
  );

  return showBar && <RoundedIcon style={styleBar} IconComponent={Bar} />;
};

export default observer(MultipleSelectBar);
