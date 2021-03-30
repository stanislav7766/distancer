import React, {useState, useEffect} from 'react';
import {Item} from '~/componets/item';
import {SelectWrap, Styles} from './styles';

export const SelectableItem = ({onLongPress, onPressSelect, onPress, activeSelect, id, ...rest}) => {
  const [selected, setSelected] = useState(false);

  const {borderStyle} = Styles({selected});

  useEffect(() => {
    !activeSelect && setSelected(false);
  }, [activeSelect]);

  const activeBorder = () => {
    setSelected(true);
  };
  const onTap = () => {
    setSelected(!selected);
  };

  const _onPress = () => {
    if (!activeSelect) {
      onPress();
      return;
    }
    onPressSelect(id, onTap);
  };

  const _onLongPress = () => {
    if (activeSelect) return;
    onLongPress(id, activeBorder);
  };

  return (
    <SelectWrap>
      <Item onPress={_onPress} onLongPress={_onLongPress} borderStyle={borderStyle} {...rest} />
    </SelectWrap>
  );
};
