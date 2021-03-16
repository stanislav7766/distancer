import React from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {styles, windowWidth, Row, mt10, mx0, Styles} from '../styles';
import {useTheme} from '~/stores/theme';
import {Preview} from '~/componets/preview';
import {Item} from '~/componets/item';
import {getLocaleStore} from '~/stores/locale';
import {RouteActionsBar} from '~/componets/actions-bar';

const {papyrusify} = getLocaleStore();

const buildItemString = ({distance}, designation) => `Distance  :  ${distance} ${designation.km}`;

export const useModalNotFinishedRoute = modal => {
  const {shownWindow, onShowWindow, onHideWindow, init, onSave, onContinue, onDelete} = modal;
  const {headerText, preset, route} = init;
  const {themeStyle} = useTheme();
  const {styleItemActivity} = Styles(themeStyle);

  const onCloseWindow = () => {
    onDelete();
  };

  const Header = (
    <Row {...mx0}>
      <Text style={styles.notFinishedHeader}>{headerText}</Text>
    </Row>
  );
  const RoutePreview = route && (
    <Row {...mt10} {...mx0}>
      <Preview previewStyle={styles.preview} coords={route.points} />
    </Row>
  );
  const Detail = route && (
    <Row {...mt10} {...mx0}>
      <Item
        style={styleItemActivity}
        onPress={() => {}}
        text={buildItemString(route, papyrusify('common.designation'))}
      />
    </Row>
  );

  const ActionsBar = (
    <Row {...mt10} {...mx0}>
      <RouteActionsBar themeStyle={themeStyle} onPressSave={onSave} onPressContinue={onContinue} />
    </Row>
  );

  const ShowWindow = shownWindow && (
    <>
      <Window
        opacity={0.35}
        preset={preset}
        closeWindow={onCloseWindow}
        maskColor="#000"
        backgroundColor={themeStyle.backgroundColor}
        width={windowWidth}
      >
        <View>
          {Header}
          {ActionsBar}
          {RoutePreview}
          {Detail}
        </View>
      </Window>
    </>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};
