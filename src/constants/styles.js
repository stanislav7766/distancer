import styled from 'styled-components';
import {THEMES} from './constants';

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
    accentColor: '#00C2FF',
    accentColorSecondary: '#FF6868',
    backgroundColor: '#404040',
    backgroundColorSecondary: '#525252',
    textColor: '#fff',
    textColorSecondary: '#8D8D8D',
  },
  [THEMES.LIGHT]: {
    accentColor: '#00C2FF',
    accentColorSecondary: '#FF6868',
    backgroundColor: '#fff',
    backgroundColorSecondary: '#fff',
    textColor: '#000',
    textColorSecondary: '#8D8D8D',
  },
};
