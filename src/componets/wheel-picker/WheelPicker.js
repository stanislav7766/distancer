import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {View, Text, VirtualizedList} from 'react-native';
import {Styles, Container, SelectedItem, textStyleDefault} from './styles';
import {randomID} from '../../utils/randomID';

const findIndex = (arr, val) => arr.findIndex(obj => obj.value === val);

const WheelPicker = ({items, selectedValue, onValueChange, textStyle, highlightStyle, sizes, backgroundColor}) => {
  const itemsWithID = items.map(item => ({...item, id: randomID()}));
  const virtualListRef = useRef(null);

  const {width, height, itemHeight} = sizes;
  const offsetTop = (height - itemHeight) / 2;
  const offsetHeight = (height * 0.8 - itemHeight) / 2;

  const getItem = (_, index) => itemsWithID[index];
  const getItemCount = _ => itemsWithID.length;
  const getItemLayout = (_, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const onUpdateValue = index => {
    const {value} = itemsWithID[index];
    selectedValue !== value && onValueChange(value);
  };
  const scrollToOffset = offset => {
    virtualListRef?.current?.scrollToOffset({
      offset,
      animated: true,
    });
  };

  const onScrollEnd = e => {
    const verticalY = e?.nativeEvent?.contentOffset?.y ?? 0;
    const selectedIndex = Math.round(verticalY / itemHeight);
    const offset = selectedIndex * itemHeight;
    offset !== verticalY && scrollToOffset(offset);
    onUpdateValue(selectedIndex);
  };

  const renderItem = ({item}) => (
    <SelectedItem itemHeight={itemHeight}>
      <Text style={[textStyleDefault, textStyle]}>{item.label}</Text>
    </SelectedItem>
  );

  const ContainerProps = {
    backgroundColor,
    height,
    width,
  };
  const {highlightStyleDefault, offsetStyle} = Styles({itemHeight, offsetTop, offsetHeight});

  const Offset = <View style={offsetStyle} />;

  return (
    <Container {...ContainerProps}>
      <View style={[highlightStyleDefault, highlightStyle]} />
      <VirtualizedList
        style={{maxHeight: height * 0.8}}
        ref={_sview => (virtualListRef.current = _sview)}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        onMomentumScrollEnd={onScrollEnd}
        ListHeaderComponent={Offset}
        ListFooterComponent={Offset}
        data={[]}
        initialScrollIndex={findIndex(itemsWithID, selectedValue) ?? 0}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        renderItem={renderItem}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

WheelPicker.propTypes = {
  items: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
  highlightStyle: PropTypes.object,
  sizes: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
};

WheelPicker.defaultProps = {
  sizes: {
    width: 200,
    height: 200,
    itemHeight: 40,
  },
  textStyle: {},
  highlightStyle: {},
};

export default WheelPicker;
