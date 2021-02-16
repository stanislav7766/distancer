import React, {memo} from 'react';
import useLoopIterator from '~/hooks/use-loop-iterator';
import {isEqualJson} from '~/utils/validation/helpers';
import LiveInfoForm from './LiveInfoForm';
import {styles} from './styles';

const onUpdate = (prev, next) => isEqualJson(prev, next);

const LiveInfo = ({onPressCb, items, titleProp, subTitleProp, titleValue, defaultValue}) => {
  const [item, onNextItem] = useLoopIterator(items);

  const onPress = () => {
    onPressCb(onNextItem());
  };

  return (
    <LiveInfoForm
      containerStyle={styles.container}
      textStyle={styles.text}
      subTextStyle={styles.subText}
      onPress={onPress}
      title={`${titleValue ?? defaultValue}${item[titleProp]}`}
      subTitle={item[subTitleProp]}
    />
  );
};
export default memo(LiveInfo, onUpdate);
