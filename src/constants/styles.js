import styled from 'styled-components';
import {THEMES, ACCENT_GREEN, ACCENT_BLUE, ACCENT_RED} from './constants';

export const Column = styled.View`
  flex: 1;
  align-items: ${props => props.alignItems || 'center'};
  flex-direction: column;
`;
export const Row = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  justify-content: ${props => props.justifyContent || 'center'};
  flex-direction: row;
`;

export const ThemeStyle = {
  [THEMES.DARK]: {
    accentColor: ACCENT_BLUE,
    accentColorSecondary: ACCENT_RED,
    backgroundColor: '#404040',
    backgroundColorSecondary: '#525252',
    textColor: '#fff',
    textColorSecondary: '#8D8D8D',
  },
  [THEMES.LIGHT]: {
    accentColor: ACCENT_BLUE,
    accentColorSecondary: ACCENT_RED,
    backgroundColor: '#fff',
    backgroundColorSecondary: '#fff',
    textColor: '#000',
    textColorSecondary: '#8D8D8D',
  },
};

export const lineStyle = {
  lineCap: 'round',
  lineWidth: 6,
  lineOpacity: 1,
  lineColor: ACCENT_BLUE,
};

export const annotationStyle = {
  width: 20,
  height: 20,
  backgroundColor: ACCENT_BLUE,
  borderRadius: 20 / 2,
};

export const redPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_RED,
  circleRadius: 20 / 2 - 3,
};
export const greenPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_GREEN,
  circleRadius: 20 / 2 - 3,
};
export const mainPoint = {
  circleOpacity: 1,
  circleColor: ACCENT_BLUE,
  circleRadius: 20 / 2,
};
