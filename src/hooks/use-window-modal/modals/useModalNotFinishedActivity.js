import React from 'react';
import {Text, View} from 'react-native';
import {Window} from '~/componets/window';
import {styles, windowWidth, Row, mt10, mx0, Styles} from '../styles';
import {useTheme} from '~/stores/theme';
import {Preview} from '~/componets/preview';
import {Item} from '~/componets/item';
import {DIRECTIONS_MODE} from '~/constants/constants';
import {getLocaleStore} from '~/stores/locale';
import {ActivityActionsBar} from '~/componets/actions-bar';

const {papyrusify} = getLocaleStore();
const {WALKING} = DIRECTIONS_MODE;

const buildItemString = ({distance, pace, movingTime, avgSpeed}, isRun, designation) =>
  `${distance} ${designation.km}  :  ${
    isRun ? `${pace} ${designation.perKM}` : `${avgSpeed}${designation.kmPerH}`
  }  :  ${movingTime}`;

export const useModalNotFinishedActivity = modal => {
  const {shownWindow, onShowWindow, onHideWindow, init, onSave, onContinue, onDelete} = modal;
  const {headerText, preset, activity} = init;
  const {themeStyle} = useTheme();
  const {styleItemActivity} = Styles(themeStyle);

  const isRun = activity?.directionsMode === WALKING;
  const onCloseWindow = () => {
    onDelete();
  };

  const Header = (
    <Row {...mx0}>
      <Text style={styles.notFinishedHeader}>{headerText}</Text>
    </Row>
  );
  const ActivityPreview = activity && (
    <Row {...mt10} {...mx0}>
      <Preview previewStyle={styles.preview} coords={activity.points1} />
    </Row>
  );
  const Detail = activity && (
    <Row {...mt10} {...mx0}>
      <Item
        style={styleItemActivity}
        onPress={() => {}}
        text={buildItemString(activity, isRun, papyrusify('common.designation'))}
      />
    </Row>
  );

  const ActionsBar = (
    <Row {...mt10} {...mx0}>
      <ActivityActionsBar themeStyle={themeStyle} onPressSave={onSave} onPressContinue={onContinue} />
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
          {ActivityPreview}
          {Detail}
        </View>
      </Window>
    </>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};
