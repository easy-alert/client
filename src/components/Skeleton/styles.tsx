import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  width: 100%;
  height: 125px;
  border-radius: ${theme.size.xxsm};
  background: linear-gradient(-90deg, #ededed 0%, #fafafa 50%, #ededed 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;
