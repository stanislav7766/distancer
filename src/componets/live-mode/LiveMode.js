import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Row, Column, Styles} from './styles';
import {AppState, Alert} from 'react-native';
import Btn from '../btn/Btn';
import LiveInfo from '../live-info/LiveInfo';
import {liveRouteContext, appModeContext} from '../../contexts/contexts';
import {randomID} from '../../utils/randomID';
import {
  LIVE_TYPES,
  LIVE_MODDING,
  LIVE_SPECS_DEFAULT,
  ERROR_OCCURRED,
  REQUIRE_LOCATION_PERMS,
  QUESTION_OPEN_SETTINGS,
  DIRECTIONS_MODE,
} from '../../constants/constants';
import {readActivities, writeActivities} from '../../utils/fs';

import {msTohhmmss} from '../../utils/timeToSec';
import useStopwatch from '../stopwatch/useStopwatch';
import {makeIterator} from '../../utils/makeIterator';
import Toast from 'react-native-simple-toast';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
const {WALKING} = DIRECTIONS_MODE;
const {STOP, GO, PAUSE} = LIVE_TYPES;
const isGoOut = appState => appState === 'background' || appState === 'inactive';
const callAlert = showAppSettings =>
  Alert.alert(REQUIRE_LOCATION_PERMS, QUESTION_OPEN_SETTINGS, [
    {text: 'Yes', onPress: () => showAppSettings()},
    {text: 'No', onPress: () => {}, style: 'cancel'},
  ]);

const LiveMode = ({themeStyle, closeModal, openModal}) => {
  const {time, startWatch, resetWatch, stopWatch} = useStopwatch();

  const [timeChanges, setTimeChanges] = useState({
    startBg: 0,
    beforeBg: 0,
    startMS: 0,
  });

  const {hhmmss, ms, status: timeStatus} = time;
  const [cSpeeds, setCSpeed] = useState(0.0);
  const [aSpeed, setASpeed] = useState(0.0);

  const [appState, setAppState] = useState(AppState.currentState);

  const backgroundTime = inGoOut => {
    if (inGoOut && timeStatus === 'tick') {
      stopWatch();

      setTimeChanges({
        ...timeChanges,
        startBg: new Date().getTime(),
        beforeBg: ms,
      });
    } else if (!inGoOut && timeStatus === 'stop') {
      const {startBg, beforeBg} = timeChanges;
      const dif = new Date().getTime() - startBg;
      startWatch(dif + beforeBg);
    }
  };

  useEffect(() => {
    status === GO && backgroundTime(isGoOut(appState));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    !!(status !== STOP) && openModal();
    setIsDirectionsMode(true);
    setDirectionsMode(WALKING);
    BackgroundGeolocation.configure(bgConfig);

    BackgroundGeolocation.on('location', location => {
      BackgroundGeolocation.startTask(taskKey => {
        watchCB(location, BackgroundGeolocation.liveRoute);
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('authorization', _status => {
      _status !== BackgroundGeolocation.AUTHORIZED &&
        setTimeout(() => callAlert(BackgroundGeolocation.showAppSettings), 1000);
    });
    return () => {
      BackgroundGeolocation.deleteAllLocations();
      BackgroundGeolocation.removeAllListeners();
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _handleAppStateChange = async nextAppState => setAppState(nextAppState);

  const {directionsMode, setIsDirectionsMode, setDirectionsMode} = useContext(appModeContext);

  const {liveRoute, setLiveRoute, setDefaultLiveRoute} = useContext(liveRouteContext);
  const {currentSpeed, status, distance, avgSpeed, movingTime} = liveRoute;

  const [aIt] = useState(makeIterator(LIVE_MODDING));
  const [A, setA] = useState(aIt.next().value);

  const watchCB = (coords, _liveRoute) => {
    if (_liveRoute.status === GO) {
      const _speed = coords.speed || 0;
      setLiveRoute({
        ..._liveRoute,
        currentSpeed: (3.6 * _speed).toFixed(1),
        points1: [..._liveRoute.points1, [coords.longitude, coords.latitude]],
      });
    }
  };
  const {btnDims, btnContinueDims, btnPauseDims, liveInfoDims} = Styles(themeStyle);

  const setStatus = _status => setLiveRoute({...liveRoute, status: _status});
  const setMovingTime = _movingTime => setLiveRoute({...liveRoute, movingTime: _movingTime});

  useEffect(() => {
    status === GO && BackgroundGeolocation.start();
    (status === PAUSE || status === STOP) && BackgroundGeolocation.stop();
    status === PAUSE && setLiveRoute({...liveRoute, currentSpeed: LIVE_SPECS_DEFAULT.currSpeed});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    BackgroundGeolocation.liveRoute = liveRoute;
  }, [liveRoute]);

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
    startWatch();
    const startMS = new Date().getTime();
    openModal();
    setTimeChanges({...timeChanges, startMS});
    setLiveRoute({...liveRoute, id: randomID(), status: GO});
  };
  const onPressPause = () => {
    stopWatch();
    setStatus(PAUSE);
  };
  const onPressContinue = () => {
    startWatch();
    setStatus(GO);
  };
  const calcTotalTime = start => msTohhmmss(new Date().getTime() - start);
  const onPressStop = async () => {
    const totalTime = calcTotalTime(timeChanges.startMS);
    closeModal();
    resetWatch();
    setStatus(STOP);
    setDefaultLiveRoute();
    const {currentSpeed, status, ...rest} = liveRoute;
    const activity = {...rest, totalTime, directionsMode};
    setIsDirectionsMode(false);
    onSave(activity);
  };

  const routeModeCall = type =>
    ({
      distance: distance || LIVE_SPECS_DEFAULT[type],
      avgSpeed: aSpeed || LIVE_SPECS_DEFAULT[type],
      time: movingTime,
      currSpeed: cSpeeds || LIVE_SPECS_DEFAULT.currSpeed,
    }[type]);

  const StopButton = <Btn style={btnDims} title={`Let's go!`} onPress={onPressStart} />;
  const GoButton = <Btn style={btnPauseDims} title={'Pause'} onLongPress={onPressStop} onPress={onPressPause} />;
  const PauseButton = (
    <Btn style={btnContinueDims} title={'Continue'} onLongPress={onPressStop} onPress={onPressContinue} />
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
        style={liveInfoDims}
        title={`${routeModeCall('currSpeed')} km/h`}
        subTitle={'Current speed'}
        onPress={() => {}}
      />
    </Column>
  );

  const LiveProps = (
    <Column alignItems={'flex-end'}>
      <LiveInfo
        style={liveInfoDims}
        title={`${routeModeCall(A.type)}${A.title}`}
        subTitle={A.subTitle}
        onPress={() => setA(aIt.next().value)}
      />
    </Column>
  );

  const Button = appModeCall(status);
  return (
    <Fragment>
      <Row marginTop={10}>
        <Column alignItems={'center'}>{Button}</Column>
      </Row>
      {status !== STOP && (
        <Row marginTop={10}>
          {CurrentSpeed}
          {LiveProps}
        </Row>
      )}
    </Fragment>
  );
};

export default LiveMode;

const bgConfig = {
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  stationaryRadius: 5,
  distanceFilter: 5,
  notificationsEnabled: false,
  debug: false,
  startOnBoot: false,
  stopOnTerminate: true,
  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  interval: 10000,
  fastestInterval: 5000,
  activitiesInterval: 10000,
  stopOnStillActivity: false,
};

const onSave = async activity => {
  try {
    const routes = await readActivities();
    const res = await writeActivities(routes.length > 0 ? [...routes, activity] : [activity]);
    Toast.show(res ? 'Saved' : ERROR_OCCURRED);
  } catch (error) {
    Toast.show(ERROR_OCCURRED);
  }
};
