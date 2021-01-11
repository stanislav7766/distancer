import React, {memo} from 'react';
import {Text, View} from 'react-native';
import VirtualList from '../virtualized-list';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {Row, Column, Styles, mt10, mb20, mx0} from './styles';
import {DIRECTIONS_MODE} from '../../constants/constants';
import Section from '../section/Section';
import {buildActivityString, buildRunString, buildItemString} from './papyrus';

const {WALKING} = DIRECTIONS_MODE;

const ActivityGroup = ({items, header, direction, onPresItem, themeStyle}) => {
  const {styleItemActivity, styleFormHeaderDate, styleFormHeaderInfo} = Styles(themeStyle);

  const isRun = direction === WALKING;
  const initNumToRender = items.length <= 15 ? items.length : 15;
  const Footer = <Row {...mb20} />;
  const renderPreview = coords => <Preview coords={coords} />;

  const renderItem = ({item}) => (
    <Row {...mt10}>
      <Item
        style={styleItemActivity}
        IconComponent={renderPreview(item.points1)}
        onPress={() => onPresItem(item)}
        text={buildItemString(item, isRun)}
      />
    </Row>
  );
  const renderGroupHeader = ({year, month, monthTotals}) => (
    <>
      <Row {...mt10}>
        <Column alignItems={'flex-start'}>
          <Text style={styleFormHeaderDate}>
            {month.toUpperCase()} {year}
          </Text>
        </Column>
        <Column alignItems={'flex-end'}>
          <Text style={styleFormHeaderInfo}>
            {isRun ? buildRunString(monthTotals) : buildActivityString(monthTotals)}
          </Text>
        </Column>
      </Row>
      <Row {...mx0}>
        <Section borderColor={themeStyle.sectionColor} />
      </Row>
    </>
  );

  return (
    <View>
      <VirtualList
        renderItem={renderItem}
        items={items}
        Header={renderGroupHeader(header)}
        Footer={Footer}
        initialNumToRender={initNumToRender}
        keyExtractor={_item => _item.id}
      />
    </View>
  );
};

export default memo(ActivityGroup, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
