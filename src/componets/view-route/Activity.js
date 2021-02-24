import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import Toast from 'react-native-simple-toast';
import {useLocationPosition} from '~/hooks/use-location-position';
import {Row, Column, stylesActivityProps, btnDeleteStyles, mt10} from './styles';
import {ERROR_OCCURRED, DELETE_ACTIVITY_CONFIRM, ACCENT_BLUE} from '~/constants/constants';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useOnDefaultActivity} from '~/hooks/use-on-effect';
import SelectDirection from '~/componets/directions-bar/SelectDirection';
import {deleteActivity} from '~/actions';
import {useAuth} from '~/stores/auth';
import {useMap} from '~/stores/map';
import {observer} from 'mobx-react-lite';
import {useLiveRoute} from '~/stores/live-route';
import {useActivities} from '~/stores/activities';
import {isFilledArr} from '~/utils/validation/helpers';

const Activity = ({themeStyle, goToMain}) => {
  const {liveRoute} = useLiveRoute();
  const {removeById} = useActivities();

  const {profile} = useAuth();
  const {zoomLevel, cameraRef} = useMap();
  const {moveCamera} = useLocationPosition(cameraRef);
  const {distance, pace, avgSpeed, totalTime, movingTime, points1, directionsMode, id: activityId} = liveRoute;

  const {setInit, onShowConfirm, onHideConfirm} = useConfirm();

  useOnDefaultActivity({unmount: true});

  const onPressCancel = () => {
    removeById(activityId);
    goToMain();
  };
  useEffect(() => {
    isFilledArr(points1) && moveCamera({zoomLevel, centerCoordinate: points1[0]});
  }, [moveCamera, points1, zoomLevel]);

  const onPressDelete = () => {
    const payload = {activity: liveRoute, userId: profile.userId};
    deleteActivity({payload})
      .then(res => {
        const {success, reason} = res;
        success && onPressCancel();
        Toast.show(success ? 'Deleted' : reason);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      });
  };

  const onRequestDelete = () => {
    setInit({
      text: DELETE_ACTIVITY_CONFIRM,
      onNo: onHideConfirm,
      onYes: onPressDelete,
    });
    onShowConfirm();
  };

  return (
    <>
      <Row {...mt10}>
        <Column>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>Distance</Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{distance} km</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>Pace</Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{pace} /km</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>Avg. speed</Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{avgSpeed} km/h</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>MovingTime</Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{movingTime}</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>Total time</Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{totalTime}</Text>
            </Column>
          </Row>
        </Column>
      </Row>
      <Row alignItems="center" {...mt10}>
        <Column alignItems={'flex-start'}>
          <SelectDirection mode={directionsMode} color={ACCENT_BLUE} />
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn {...btnDeleteStyles} title={'Delete Activity'} onPress={onRequestDelete} />
        </Column>
      </Row>
    </>
  );
};

export default observer(Activity);
