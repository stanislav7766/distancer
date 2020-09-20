import styled from 'styled-components';

export const stylesBtnForm = {
  justifyContent: 'center',
  width: 'auto',
  height: 'auto',
  borderRadius: 15,
  elevation: 7,
  backgroundColor: '#4285F4',
};

export const stylesBtnText = {
  fontSize: 15,
  color: '#fff',
};

export const Column = styled.View`
  justify-content: center;
  align-items: ${props => props.alignItems || 'center'};
`;

export const Row = styled.View`
  flex-direction: row;
`;
