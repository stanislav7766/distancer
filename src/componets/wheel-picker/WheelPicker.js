import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {Styles, Container, SelectedItem, textStyleDefault} from './styles';

const findIndex = (arr, val) => arr.findIndex(obj => obj.value === val);

const WheelPicker = ({items, selectedValue, onValueChange, textStyle, highlightStyle, sizes, backgroundColor}) => {
  const {width, height, itemHeight} = sizes;
  const scrollViewRef = useRef(null);
  const offsetTop = (height - itemHeight) / 2;
  const offsetHeight = (height * 0.8 - itemHeight) / 2;

  useEffect(() => {
    selectedValue && scrollToValue(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  const scrollToValue = val => {
    const ind = findIndex(items, val);
    const y = itemHeight * ind;
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({y, animated: false});
    }, 1);
  };

  const {highlightStyleDefault, offsetStyle} = Styles({itemHeight, offsetTop, offsetHeight});
  const Offset = <View style={offsetStyle} />;

  const onMomentumScrollEnd = e => scrollFix(e);

  const renderItems = () =>
    items.map(({label}, i) => (
      <SelectedItem key={i} itemHeight={itemHeight}>
        <Text style={[textStyleDefault, textStyle]}>{label}</Text>
      </SelectedItem>
    ));

  const scrollFix = e => {
    const verticalY = e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.y : 0;

    const selectedIndex = Math.round(verticalY / itemHeight);
    const verticalElem = selectedIndex * itemHeight;
    verticalElem !== verticalY &&
      scrollViewRef &&
      scrollViewRef.current.scrollTo({
        y: verticalElem,
        animated: true,
      });
    const {value} = items[selectedIndex];
    selectedValue !== value && onValueChange(value);
  };
  const ContainerProps = {
    backgroundColor,
    height,
    width,
  };
  return (
    <Container {...ContainerProps}>
      <View style={[highlightStyleDefault, highlightStyle]} />
      <ScrollView
        style={{maxHeight: height * 0.8}}
        ref={_sview => (scrollViewRef.current = _sview)}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {Offset}
        {renderItems()}
        {Offset}
      </ScrollView>
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
