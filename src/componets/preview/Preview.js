import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import CanvasNative from 'react-native-canvas';
import {fromLatLngToPoint, getPointsDimenssions} from '~/utils/point-helpers';
import {getAnimation, runAnimation} from '~/utils/animations';
import {stylePreview} from './styles';

const Preview = ({coords}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const styleAnim = {
    opacity: fadeAnim,
  };

  const handleAnim = () => {
    runAnimation(getAnimation(fadeAnim, {toValue: 2, duration: 2000, useNativeDriver: true}));
  };
  const handleCanvas = canvas => {
    if (canvas) {
      const {width, height, lineColor} = stylePreview;

      const ctx = canvas.getContext('2d');
      ctx.shadowColor = 'rgba(128,128,128,.2)';
      ctx.shadowBlur = 1;
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = lineColor;
      const worldPoints = coords.reduce((accum, latlng) => [...accum, fromLatLngToPoint(latlng)], []);
      const dims = getPointsDimenssions(worldPoints);
      const scale =
        Math.min(width / dims.width, height / dims.height) - Math.min(width / dims.width, height / dims.height) / 5;

      ctx.beginPath();
      worldPoints.forEach(p => {
        ctx.lineTo((p.x - dims.centerX) * scale + width / 2, (p.y - dims.centerY) * scale + height / 2);
      });
      ctx.stroke();
      handleAnim();
    }
  };

  return (
    <View style={stylePreview}>
      <Animated.View style={styleAnim}>
        <CanvasNative ref={handleCanvas} />
      </Animated.View>
    </View>
  );
};

export default Preview;
