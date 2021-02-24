import React, {useState} from 'react';
import {LiveInfo} from '~/componets/live-info';
import {useLiveRoute} from '~/stores/live-route';
import {observer} from 'mobx-react-lite';
import {LIVE_CURRENT_PROPS, LIVE_MODDING, LIVE_SPECS_DEFAULT} from '~/constants/constants';
import {Column, Row, mt10} from './styles';
import {isAvgPace, isAvgSpeed, ishhmmss} from '~/utils/validation/helpers';

const LiveProps = () => {
  const {liveRoute, specs} = useLiveRoute();
  const {pace, distance, avgSpeed} = liveRoute;
  const {currentSpeed, currentPace, movingTime} = specs;

  const [currentPropType, setCurrentPropType] = useState(null);
  const [livePropType, setLivePropType] = useState(null);

  const onPressCurrentProp = item => {
    setCurrentPropType(item.type);
  };
  const onPressLiveProp = item => {
    setLivePropType(item.type);
  };

  const propValueCall = type =>
    ({
      pace: isAvgPace(pace) ? pace : LIVE_SPECS_DEFAULT.pace,
      distance: isAvgSpeed(distance) ? distance : LIVE_SPECS_DEFAULT.distance,
      avgSpeed: isAvgSpeed(avgSpeed) ? avgSpeed : LIVE_SPECS_DEFAULT.avgSpeed,
      time: ishhmmss(movingTime) ? movingTime : LIVE_SPECS_DEFAULT.time,
      currentSpeed: isAvgSpeed(currentSpeed) ? currentSpeed : LIVE_SPECS_DEFAULT.currentSpeed,
      currentPace: isAvgPace(currentPace) ? currentPace : LIVE_SPECS_DEFAULT.currentPace,
    }[type]);

  const CurrentProps = (
    <Column alignItems={'flex-start'}>
      <LiveInfo
        items={LIVE_CURRENT_PROPS}
        titleProp="title"
        subTitleProp="subTitle"
        titleValue={propValueCall(currentPropType)}
        defaultValue={propValueCall('currentSpeed')}
        onPressCb={onPressCurrentProp}
      />
    </Column>
  );

  const Props = (
    <Column alignItems={'flex-end'}>
      <LiveInfo
        items={LIVE_MODDING}
        titleProp="title"
        subTitleProp="subTitle"
        titleValue={propValueCall(livePropType)}
        defaultValue={propValueCall('pace')}
        onPressCb={onPressLiveProp}
      />
    </Column>
  );

  return (
    <Row {...mt10}>
      {CurrentProps}
      {Props}
    </Row>
  );
};

export default observer(LiveProps);
