import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {VirtualList} from '~/componets/virtualized-list';
import {Preview} from '~/componets/preview';
import {Row, Column, Styles, mt10, mb20, mx0, flex0} from './styles';
import {ACTIVITIES_BATCH_LIMIT, DIRECTIONS_MODE} from '~/constants/constants';
import {Section} from '~/componets/section';
import {buildActivityString, buildRunString, buildItemString} from './papyrus';
import {isEqualJson} from '~/utils/validation/helpers';
import {getLocaleStore} from '~/stores/locale';
import {SelectableItem} from '~/componets/selectable-item';
import {getMultipleSelectBar} from '~/stores/multiple-select-bar';

const {papyrusify} = getLocaleStore();
const multipleSelectStore = getMultipleSelectBar();

const {WALKING} = DIRECTIONS_MODE;
const onUpdate = (prev, next) => isEqualJson(prev, next);

const ActivityItem = memo(({themeStyle, item, onPresItem, isRun, designation, activeSelect, onActivateSelect}) => {
  const {styleItemActivity} = Styles(themeStyle);

  const onPressSelect = (id, cb) => {
    id === item.id && cb();
    multipleSelectStore.onTap(item);
  };
  const onLongPress = (id, cb) => {
    id === item.id && cb();
    onActivateSelect(item);
  };
  return (
    <Row {...mt10}>
      <SelectableItem
        style={styleItemActivity}
        IconComponent={<Preview coords={item.points1} />}
        onPress={() => onPresItem(item)}
        text={buildItemString(item, isRun, designation)}
        onPressSelect={onPressSelect}
        onLongPress={onLongPress}
        activeSelect={activeSelect}
        id={item.id}
      />
    </Row>
  );
}, onUpdate);

const ActivityGroup = ({
  items,
  header,
  direction,
  onPresItem,
  themeStyle,
  onNext,
  designation,
  activeSelect,
  onActivateSelect,
}) => {
  const {styleFormHeaderDate, styleFormHeaderInfo} = Styles(themeStyle);
  const isRun = direction === WALKING;

  const Footer = <Row {...mb20} />;

  const renderItem = ({item}) => (
    <ActivityItem
      designation={designation}
      isRun={isRun}
      themeStyle={themeStyle}
      onPresItem={onPresItem}
      item={item}
      activeSelect={activeSelect}
      onActivateSelect={onActivateSelect}
    />
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
