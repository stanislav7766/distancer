import React, {Fragment, useState, useContext, useEffect, useRef} from 'react';
import {Vibration} from 'react-native';
import {Row, Column, Styles, btnStartStyles, btnPauseStyles, btnContinueStyles, mt10} from './styles';
import Btn from '../btn/Btn';
import LiveInfo from '../live-info/LiveInfo';
import {liveRouteContext, appModeContext} from '../../contexts/contexts';
import {randomID} from '../../utils/randomID';
import {LIVE_TYPES, LIVE_MODDING, LIVE_SPECS_DEFAULT, ERROR_OCCURRED, DIRECTIONS_MODE} from '../../constants/constants';
import {yyyymmddNow} from '../../utils/timeToSec';
import {makeIterator} from '../../utils/makeIterator';
import {useOnDirectionsMode, useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import {useActivitySettings} from '../../stores/activity-settings';
import Toast from 'react-native-simple-toast';
import useBackgroundLocation from '../../hooks/use-background-location';
import useBackgroundStopWatch from '../../hooks/use-background-stopwatch';
import {saveActivity as _saveActivity} from '../../actions';
import WithActions from '../with-actions/WithActions';
import {useDirectionsMode} from '../../stores/directions-mode';
import {observer} from 'mobx-react-lite';

const {STOP, GO, PAUSE} = LIVE_TYPES;
const {WALKING} = DIRECTIONS_MODE;

const LiveMode = ({themeStyle, closeModal, openModal, saveActivity}) => {
  const {vibrateOnStart} = useActivitySettings();

  const [cSpeeds, setCSpeed] = useState(0.0);
  const [aSpeed, setASpeed] = useState(0.0);

  const {liveRoute, setLiveRoute, setLivePoints, setDefaultLiveRoute} = useContext(liveRouteContext);
  const allowLocationUpdate = useRef(false);

  const onUpdateLocation = (lnglat, currSpeed = 0) => {
    if (allowLocationUpdate.current) {
      setLivePoints(lnglat);
      setLiveRoute({
        currentSpeed: +(3.6 * currSpeed).toFixed(1),
      });
    }
  };

  const {start, stop} = useBackgroundLocation(onUpdateLocation);

  const {auth} = useContext(appModeContext);
  const {directionsMode} = useDirectionsMode();

  const {currentSpeed, status, pace, distance, avgSpeed, movingTime} = liveRoute;
  const isGo = status === GO;
  const isStop = status === STOP;
  const {onStartWatch, onContinueWatch, onTimeWatch, onResetWatch, onStopWatch, hhmmss} = useBackgroundStopWatch(isGo);

  useOnIsDirectionsMode({mount: true});
  useEffect(() => {
    isStop && openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [aIt] = useState(makeIterator(LIVE_MODDING));
  const [A, setA] = useState(aIt.next().value);

  const {liveInfoContainer, liveInfoText, liveInfoSubText} = Styles(themeStyle);

  const setStatus = _status => setLiveRoute({status: _status});
  const setMovingTime = _movingTime => setLiveRoute({movingTime: _movingTime});

  const onVibro = () => {
    vibrateOnStart && Vibration.vibrate();
  };

  useEffect(() => {
    status === GO && start();
    (status === PAUSE || status === STOP) && stop();
    status === PAUSE && setLiveRoute({currentSpeed: LIVE_SPECS_DEFAULT.currSpeed});
    allowLocationUpdate.current = status === GO ? true : false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setCSpeed(currentSpeed);
  }, [currentSpeed]);

  useEffect(() => {
    setASpeed(avgSpeed);
  }, [avgSpeed]);

  useEffect(() => {
    setMovingTime(hhmmss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hhmmss]);

  const onPressStart = () => {
    onVibro();
    onStartWatch();
    const date = yyyymmddNow();
    openModal();
    setLiveRoute({id: randomID(), status: GO, date});
  };
  const onPressPause = () => {
    onVibro();
    onStopWatch();
    setStatus(PAUSE);
  };
  const onPressContinue = () => {
    onVibro();
    onContinueWatch();
    setStatus(GO);
  };

  const onPressCancel = () => {
    closeModal();
    onResetWatch();
    setStatus(STOP);
    setDefaultLiveRoute();
  };

  const onPressStop = async () => {
    onVibro();
    const totalTime = onTimeWatch();
    const {currentSpeed, status, distance, ...rest} = liveRoute;
    const _distance = Number(distance);
    const activity = {...rest, distance: _distance, totalTime, directionsMode};
    saveActivity({payload: {activity, userId: auth.userId}})
      .then(res => {
        const {success, reason} = res;
        Toast.show(success ? 'Saved' : reason);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        onPressCancel();
      });
  };

  const routeModeCall = type =>
    ({
      pace: pace || LIVE_SPECS_DEFAULT[type],
      distance: distance || LIVE_SPECS_DEFAULT[type],
      avgSpeed: aSpeed || LIVE_SPECS_DEFAULT[type],
      time: movingTime,
      currSpeed: cSpeeds || LIVE_SPECS_DEFAULT.currSpeed,
    }[type]);

  const StopButton = <Btn {...btnStartStyles} title={"Let's go!"} onPress={onPressStart} />;
  const GoButton = <Btn {...btnPauseStyles} title={'Pause'} onLongPress={onPressStop} onPress={onPressPause} />;
  const PauseButton = (
    <Btn {...btnContinueStyles} title={'Continue'} onLongPress={onPressStop} onPress={onPressContinue} />
  );

  const appModeCall = mode =>
    ({
      [STOP]: StopButton,
      [GO]: GoButton,
      [PAUSE]: PauseButton,
    }[mode]);

  const CurrentSpeed = (
    <Column alignItems={'flex-start'}>
      <LiveInfo
        containerStyle={liveInfoContainer}
        textStyle={liveInfoText}
        subTextStyle={liveInfoSubText}
        title={`${routeModeCall('currSpeed')} km/h`}
        subTitle={'Current speed'}
        onPress={() => {}}
      />
    </Column>
  );

  const LiveProps = (
    <Column alignItems={'flex-end'}>
      <LiveInfo
        containerStyle={liveInfoContainer}
        textStyle={liveInfoText}
        subTextStyle={liveInfoSubText}
        title={`${routeModeCall(A.type)}${A.title}`}
        subTitle={A.subTitle}
        onPress={() => setA(aIt.next().value)}
      />
    </Column>
  );

  const Button = appModeCall(status);
  return (
    <Fragment>
      {status !== STOP && (
        <Row {...mt10}>
          {CurrentSpeed}
          {LiveProps}
        </Row>
      )}
      <Row {...mt10}>
        <Column alignItems={'center'}>{Button}</Column>
      </Row>
    </Fragment>
  );
};

const mapDispatchToProps = {
  saveActivity: _saveActivity,
};
export default WithActions(mapDispatchToProps)(observer(LiveMode));
