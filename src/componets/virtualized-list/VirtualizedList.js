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
  refresh,
}) => {
  const getItemCount = _ => items.length;

  const getItem = (_, index) => items[index];

  return (
    <VirtualizedList
      style={containerStyle}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
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
  refresh: {},
};

export default VirtualList;
