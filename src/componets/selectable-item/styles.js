import styled from 'styled-components';
import {ACCENT_BLUE} from '~/constants/constants';

export const SelectWrap = styled.View`
  flex: 1;
`;

export const Styles = ({selected}) => {
  const borderStyle = {
    borderColor: ACCENT_BLUE,
    borderRadius: 15,
    borderWidth: selected ? 1 : 0,
  };
  return {borderStyle};
};
