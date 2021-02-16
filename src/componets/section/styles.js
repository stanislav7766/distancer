import styled from 'styled-components';
import {isExist} from '~/utils/validation/helpers';
export {Row} from '~/constants/styles';

export const SectionWrap = styled.View`
  width: ${props => (isExist(props.width) ? `${props.width}px` : '100%')};
  margin-top: 5px;
  border-bottom-width: 3px;
  border-color: ${props => props.borderColor ?? '#d3'};
`;
