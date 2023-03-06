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
  gap: ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.color.gray2};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  > p {
    font-weight: 400;
  }
`;

export const AnnexesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.size.xsm};
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  background-color: ${theme.color.primaryL};
  width: fit-content;
  height: fit-content;
  border-radius: ${theme.size.xxsm};
  gap: ${theme.size.xsm};

  > a {
    display: flex;
    align-items: center;
    gap: ${theme.size.xxsm};
    color: ${theme.color.black};

    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      max-width: 185px;
    }

    transition: 0.25s;
    :hover {
      opacity: 0.7;
    }
  }
`;
