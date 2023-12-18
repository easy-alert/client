import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  > :nth-child(2) {
    max-width: 300px;
  }
`;
