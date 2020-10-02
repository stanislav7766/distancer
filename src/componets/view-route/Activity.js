import React, {Fragment, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {liveRouteContext, appModeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesActivityProps, Styles} from './styles';
import {APP_MODE, ERROR_OCCURRED} from '../../constants/constants';
import SelectDirection from '../directions-bar/SelectDirection';
import WithActions from '../with-actions/WithActions';
import {deleteActivity as _deleteActivity} from '../../actions';

const {VIEW_MODE} = APP_MODE;

const Activity = ({themeStyle, deleteActivity}) => {
  const {setDefaultLiveRoute, setDefaultActivities, liveRoute} = useContext(liveRouteContext);

  const {setAppMode, directionsMode, auth} = useContext(appModeContext);
  const {btnDims} = Styles(themeStyle);
  const {distance, pace, avgSpeed, totalTime, movingTime} = liveRoute;

  const onPressCancel = () => {
    setDefaultLiveRoute();
    setDefaultActivities();
    setAppMode(VIEW_MODE);
  };

  const onPressDelete = () => {
    const payload = {activityId: liveRoute.id, userId: auth.userId, directionsMode};
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

  return (
    <Fragment>
      <Row marginTop={10}>
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
      <Row marginTop={10}>
        <Column alignItems={'flex-start'}>
          <SelectDirection themeStyle={themeStyle} mode={directionsMode ? directionsMode : ''} />
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn style={btnDims} title={'Delete Activity'} onPress={onPressDelete} />
        </Column>
      </Row>
    </Fragment>
  );
};

const mapDispatchToProps = {deleteActivity: _deleteActivity};
export default WithActions(mapDispatchToProps)(Activity);
