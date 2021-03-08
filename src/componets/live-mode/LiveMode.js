import React, {useEffect, useRef} from 'react';
import {Vibration} from 'react-native';
import {Row, Column, btnStartStyles, btnPauseStyles, btnContinueStyles, mt10} from './styles';
import {Btn} from '~/componets/btn';
import {randomID} from '~/utils/random-id';
import {LIVE_TYPES, LIVE_SPECS_DEFAULT, LIVE_STATIONARY_FILTER_M} from '~/constants/constants';
import {getTimestamp, yyyymmddNow} from '~/utils/time-helpers';
import {
  useOnIsDirectionsMode,
  useOnLiveWithRoute,
  useOnWatchLivePoints,
  useOnShowMapIcons,
} from '~/hooks/use-on-effect';
import {useActivitySettings} from '~/stores/activity-settings';
import Toast from 'react-native-simple-toast';
import useBackgroundLocation from '~/hooks/use-background-location';
import useBackgroundStopWatch from '~/hooks/use-background-stopwatch';
import {saveActivity} from '~/actions';
import {useDirectionsMode} from '~/stores/directions-mode';
import {useModalTimer as useTimer} from '~/stores/modal-timer';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import {useAuth} from '~/stores/auth';
import {useAppMode} from '~/stores/app-mode';
import {useLiveRoute} from '~/stores/live-route';
import LiveProps from './LiveProps';
import {observer} from 'mobx-react-lite';
import {isFilledArr} from '~/utils/validation/helpers';
import {measureDistanceM} from '~/utils/route-helpers';
import {getLastItem} from '~/utils/common-helpers/arr-helpers';
import {formatSpeed} from '~/utils/activity-helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const {STOP, GO, PAUSE} = LIVE_TYPES;

const LiveMode = ({closeModal, openModal}) => {
  const {vibrateOnStart, autoPause, timerOnStart} = useActivitySettings();
  const {liveWithRoute, setLiveWithRoute} = useAppMode();
  const {setInit: setInitTimer, onShowTimer} = useTimer();
  const {setInit: setInitConfirm, onShowConfirm, onHideConfirm} = useConfirm();

  const {
    liveRoute,
    specs,
    setLiveRoute,
    setMovingTime,
    pushPoints,
    setDefaultLiveRoute,
    setCurrentSpeed,
    setStatus,
  } = useLiveRoute();
  const allowLocationUpdate = useRef(false);
  const lastCoordRef = useRef([]);

  const needPause = lnglat => {
    if (!autoPause || !isFilledArr(lastCoordRef.current)) return false;
    const res = measureDistanceM([lastCoordRef.current, lnglat]) <= LIVE_STATIONARY_FILTER_M;
    res && allowLocationUpdate.current && onPressPause();
    return res;
  };

  const needContinue = () => {
    autoPause && !allowLocationUpdate.current && onPressContinue();
  };

  const onUpdateLocation = (lnglat, currSpeed = 0) => {
    if (needPause(lnglat)) return;

    needContinue();
    const speed = allowLocationUpdate.current ? formatSpeed(currSpeed) : LIVE_SPECS_DEFAULT.currentSpeed;
    setCurrentSpeed(speed);
    allowLocationUpdate.current && pushPoints([lnglat]);
  };
  const clearLiveWithRoute = () => {
    liveWithRoute && setLiveWithRoute(false);
  };
  const onVibro = () => {
    vibrateOnStart && Vibration.vibrate();
  };

  const {start: startBgLocation, stop: stopBgLocation} = useBackgroundLocation(onUpdateLocation);

  const {profile} = useAuth();
  const {directionsMode} = useDirectionsMode();

  const {points1} = liveRoute;
  const {status} = specs;
  const isGo = status === GO;
  const isStop = status === STOP;
  const {onStartWatch, onContinueWatch, onTimeWatch, onResetWatch, onStopWatch, hhmmss} = useBackgroundStopWatch(isGo);

  useEffect(() => {
    allowLocationUpdate.current = isGo;
  }, [isGo]);

  useEffect(() => {
    setMovingTime(hhmmss);
  }, [hhmmss, setMovingTime]);

  useEffect(() => {
    isFilledArr(points1) && (lastCoordRef.current = getLastItem(points1));
  }, [points1]);

  useOnWatchLivePoints({mount: true, unmount: false});
  useOnIsDirectionsMode({mount: true});
  useOnShowMapIcons({mount: true});
  useOnLiveWithRoute({unmount: false});

  const onSaveActivity = payload => {
    saveActivity({payload})
      .then(res => {
        const {success, reason} = res;
        Toast.show(success ? papyrusify('liveMode.message.saved') : reason);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      })
      .finally(_ => {
        onPressCancel();
      });
  };

  useEffect(() => {
    isStop ? closeModal() : openModal();
  }, [closeModal, isStop, openModal]);

  const needTimer = timerOnStart > 0;

  function preOnPressStart() {
    setInitTimer({
      secs: timerOnStart,
      onFinish: onPressStart,
    });
    onShowTimer();
  }
  const postOnPressStart = () => {
    setStatus(GO);
    startBgLocation();
    onStartWatch();
    onVibro();
    setLiveRoute({id: randomID(), date: yyyymmddNow(), timestamp: getTimestamp()});
  };

  function onPressStart() {
    openModal();
    setTimeout(postOnPressStart, 300);
  }
  function onPressPause() {
    onStopWatch();
    setStatus(PAUSE);
  }
  function onPressContinue() {
    onContinueWatch();
    setStatus(GO);
  }
  const postOnPressCancel = () => {
    onResetWatch();
    setStatus(STOP);
    setDefaultLiveRoute();
    clearLiveWithRoute();
  };
  const onPressCancel = () => {
    closeModal();
    postOnPressCancel();
  };
  const onRequestStop = () => {
    setInitConfirm({
      text: papyrusify('liveMode.message.finishActivityConfirm'),
      onNo: onHideConfirm,
      onYes: onPressStop,
    });
    onShowConfirm();
  };

  function onPressStop() {
    stopBgLocation();
    const totalTime = onTimeWatch();
    const {movingTime} = specs;
    const activity = {...liveRoute, totalTime, movingTime, directionsMode};
    onSaveActivity({activity, userId: profile.userId});
  }

  const statusBtnCall = mode =>
    ({
      [STOP]: (
        <Btn
          {...btnStartStyles}
          title={papyrusify('liveMode.button.start')}
          onPress={needTimer ? preOnPressStart : onPressStart}
        />
      ),
      [GO]: (
        <Btn
          {...btnPauseStyles}
          title={papyrusify('liveMode.button.pause')}
          onLongPress={onRequestStop}
          onPress={onPressPause}
        />
      ),
      [PAUSE]: (
        <Btn
          {...btnContinueStyles}
          title={papyrusify('liveMode.button.continue')}
          onLongPress={onRequestStop}
          onPress={onPressContinue}
        />
      ),
    }[mode]);

  const ActionButton = (
    <Row {...mt10}>
      <Column alignItems={'center'}>{statusBtnCall(status)}</Column>
    </Row>
  );
  return (
    <>
      {status !== STOP && <LiveProps />}
      {ActionButton}
    </>
  );
};

export default observer(LiveMode);
