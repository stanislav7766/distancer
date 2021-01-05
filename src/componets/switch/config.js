const getIconFadeParams = () => {
  const [from, to] = [0, 1];
  return {from, to};
};
const getIconOffsetParams = ({width, initialPosition}) => {
  const [from, to] = [0, width / 2];
  return {from, to, defaultValue: initialPosition ? to : from};
};
const getCircleOffsetParams = ({circleSize, padding, width, initialPosition}) => {
  const [from, to] = [padding, width - (circleSize + padding)];
  return {from, to, defaultValue: initialPosition ? to : from};
};
export const getConfig = ({width, circleSize, padding, initialPosition}) => {
  const iconFadeParams = getIconFadeParams();
  const iconOffsetParams = getIconOffsetParams({width, initialPosition});
  const circleOffsetParams = getCircleOffsetParams({width, padding, circleSize, initialPosition});

  return {iconFadeParams, iconOffsetParams, circleOffsetParams};
};
