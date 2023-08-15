import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const Card = styled.div`
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }

  > h6 {
    color: ${theme.color.gray4};
  }
`;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.size.xsm};
`;

export const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xxsm};

  > button {
    padding: unset;
    background-color: unset;
    width: fit-content;

    color: ${theme.color.gray4};
    font-size: 12px;
    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    max-width: 90px;

    :hover {
      opacity: 0.7;
    }
  }

  > p {
    color: ${theme.color.gray4};
  }
`;

export const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.size.xsm};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NoAnnexes = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 32px;

  > h5 {
    color: ${theme.color.gray4};
    text-align: center;
  }
`;
