import React from 'react';
import {VirtualizedList} from 'react-native';

const VirtualList = ({
  scrollEnabled,
  items,
  Footer,
  Header,
  containerStyle,
  initialNumToRender,
  renderItem,
  keyExtractor,
  showsVerticalScrollIndicator,
  refresh,
}) => {
  const getItemCount = _ => items.length;

  const getItem = (_, index) => items[index];

  return (
    <VirtualizedList
      style={containerStyle}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      data={[]}
      initialNumToRender={initialNumToRender}
      getItemCount={getItemCount}
      getItem={getItem}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...refresh}
    />
  );
};

VirtualList.defaultProps = {
  containerStyle: {},
  scrollEnabled: true,
  Header: null,
  Footer: null,
  showsVerticalScrollIndicator: false,
  refresh: {},
};

export default VirtualList;
