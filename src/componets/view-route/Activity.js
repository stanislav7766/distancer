import React, {useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {liveRouteContext, appModeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import {Row, Column, stylesActivityProps, btnDeleteStyles, mt10} from './styles';
import {APP_MODE, ERROR_OCCURRED, DELETE_ACTIVITY_CONFIRM} from '../../constants/constants';
import {useModalConfirm as useConfirm} from '../../stores/modal-confirm';
import SelectDirection from '../directions-bar/SelectDirection';
import WithActions from '../with-actions/WithActions';
import {deleteActivity as _deleteActivity} from '../../actions';
import {useDirectionsMode} from '../../stores/directions-mode';
import {useAuth} from '../../stores/auth';
import {observer} from 'mobx-react-lite';

const {VIEW_MODE} = APP_MODE;

const Activity = ({themeStyle, deleteActivity}) => {
  const {setDefaultLiveRoute, setDefaultActivities, liveRoute} = useContext(liveRouteContext);

  const {setAppMode} = useContext(appModeContext);
  const {profile} = useAuth();
  const {directionsMode} = useDirectionsMode();
  const {distance, pace, avgSpeed, totalTime, movingTime} = liveRoute;

  const {setInit, onShowConfirm, onHideConfirm} = useConfirm();
  useOnIsDirectionsMode({mount: false});

  const onPressCancel = () => {
    setDefaultLiveRoute();
    setDefaultActivities();
    setAppMode(VIEW_MODE);
  };

  const onPressDelete = () => {
    const payload = {activityId: liveRoute.id, userId: profile.userId, directionsMode};
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
          <SelectDirection themeStyle={themeStyle} mode={directionsMode} currentMode={directionsMode} />
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn {...btnDeleteStyles} title={'Delete Activity'} onPress={onRequestDelete} />
        </Column>
      </Row>
    </>
  );
};

const mapDispatchToProps = {deleteActivity: _deleteActivity};
export default WithActions(mapDispatchToProps)(observer(Activity));
