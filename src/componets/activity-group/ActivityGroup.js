import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {VirtualList} from '~/componets/virtualized-list';
import {Item} from '~/componets/item';
import {Preview} from '~/componets/preview';
import {Row, Column, Styles, mt10, mb20, mx0, flex0} from './styles';
import {ACTIVITIES_BATCH_LIMIT, DIRECTIONS_MODE} from '~/constants/constants';
import {Section} from '~/componets/section';
import {buildActivityString, buildRunString, buildItemString} from './papyrus';
import {isEqualJson} from '~/utils/validation/helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const {WALKING} = DIRECTIONS_MODE;
const onUpdate = (prev, next) => isEqualJson(prev, next);

const ActivityItem = memo(({themeStyle, item, onPresItem, isRun, designation}) => {
  const {styleItemActivity} = Styles(themeStyle);
  return (
    <Row {...mt10}>
      <Item
        style={styleItemActivity}
        IconComponent={<Preview coords={item.points1} />}
        onPress={() => onPresItem(item)}
        text={buildItemString(item, isRun, designation)}
      />
    </Row>
  );
}, onUpdate);

const ActivityGroup = ({items, header, direction, onPresItem, themeStyle, onNext, designation}) => {
  const {styleFormHeaderDate, styleFormHeaderInfo} = Styles(themeStyle);
  const isRun = direction === WALKING;

  const Footer = <Row {...mb20} />;

  const renderItem = ({item}) => (
    <ActivityItem designation={designation} isRun={isRun} themeStyle={themeStyle} onPresItem={onPresItem} item={item} />
  );
  const renderGroupHeader = ({year, month, monthTotals}) => (
    <>
      <Row flex={1} {...mt10}>
        <View style={flex0}>
          <Column alignItems={'flex-start'}>
            <Text style={styleFormHeaderDate}>
              {papyrusify(`common.month.${month}`).toUpperCase()} {year}
            </Text>
          </Column>
        </View>
        <Column flexGrow={1} alignItems={'flex-end'}>
          <Text style={styleFormHeaderInfo}>
            {isRun ? buildRunString(monthTotals, designation) : buildActivityString(monthTotals, designation)}
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
        initialNumToRender={ACTIVITIES_BATCH_LIMIT}
        onEndReached={onNext}
        onEndReachedThreshold={0.3}
        keyExtractor={_item => _item.id}
      />
    </View>
  );
};

export default memo(ActivityGroup, onUpdate);
