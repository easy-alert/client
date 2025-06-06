import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const InputContainer = styled.div<{ typeDatePlaceholderValue?: string; type?: string }>`
  display: flex;
  flex-direction: column;
  > h6 {
    margin-bottom: ${theme.size.xxsm};
  }
  width: 100%;

  ${({ typeDatePlaceholderValue, type }) =>
    type === 'date' &&
    typeDatePlaceholderValue === '' &&
    `
      > input {
        border-color: ${theme.color.gray3};
        color: #757575
      }
      `}
`;

export const ErrorMessage = styled.div`
  display: flex;
  color: ${theme.color.danger};

  > p {
    animation: scale-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes scale-in-left {
      0% {
        transform: scale(0);
        transform-origin: 0% 50%;
        opacity: 1;
      }
      100% {
        transform: scale(1);
        transform-origin: 0% 50%;
        opacity: 1;
      }
    }
  }
`;
