import styled from 'styled-components';
export {Row} from '../../constants/styles';

const isDefined = value => value !== undefined;

export const SectionWrap = styled.View`
  width: ${props => (isDefined(props.width) ? props.width + 'px' : '100%')};
  margin-top: 5px;
  border-bottom-width: 3px;
  border-color: ${props => props.borderColor ?? '#d3'};
`;
