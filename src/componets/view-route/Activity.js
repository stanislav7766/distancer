import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import Toast from 'react-native-simple-toast';
import {useLocationPosition} from '~/hooks/use-location-position';
import {Row, Column, stylesActivityProps, btnDeleteStyles, mt10} from './styles';
import {ACCENT_BLUE} from '~/constants/constants';
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
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const Activity = ({themeStyle, goToMain}) => {
  const {liveRoute} = useLiveRoute();
  const {removeById} = useActivities();
  const {profile} = useAuth();
  const {zoomLevel} = useMap();
  const {moveCamera} = useLocationPosition();
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
        Toast.show(success ? papyrusify('savedMode.message.deleted') : reason);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      });
  };

  const onRequestDelete = () => {
    setInit({
      text: papyrusify('savedMode.message.deleteActivityConfirm'),
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
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {papyrusify('savedMode.activityDetail.distance')}
              </Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {distance} {papyrusify('savedMode.activityDetail.km')}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {papyrusify('savedMode.activityDetail.pace')}
              </Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {pace} {papyrusify('savedMode.activityDetail.perKM')}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {papyrusify('savedMode.activityDetail.avgSpeed')}
              </Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {avgSpeed} {papyrusify('savedMode.activityDetail.kmPerH')}
              </Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {papyrusify('savedMode.activityDetail.movingTime')}
              </Text>
            </Column>
            <Column alignItems={'flex-end'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>{movingTime}</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesActivityProps, {color: themeStyle.textColorSecondary}]}>
                {papyrusify('savedMode.activityDetail.totalTime')}
              </Text>
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
          <Btn {...btnDeleteStyles} title={papyrusify('savedMode.button.deleteActivity')} onPress={onRequestDelete} />
        </Column>
      </Row>
    </>
  );
};

export default observer(Activity);
