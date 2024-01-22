import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export const Background = styled.div`
  max-width: 100%;
  overflow-x: auto;

  @media (max-width: 750px) {
    display: none;
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRowHead = styled.tr<{ bgColor?: string }>``;

export const TableRow = styled.tr<{ bgColor?: string }>`
  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
    `};

  > td {
    border-top: 1px solid ${theme.color.gray2};
  }

  :last-child td {
    border-bottom: 1px solid ${theme.color.gray2};

    :first-child {
      border-bottom-left-radius: ${theme.size.xxsm};
    }

    :last-child {
      border-bottom-right-radius: ${theme.size.xxsm};
    }
  }
`;

export const TableColHeader = styled.th<{ cssProps: any; cssOnMedia: any }>`
  color: ${theme.color.gray5};
  padding: 0 ${theme.size.xsm};
  height: 32px;
  text-align: start;
  white-space: nowrap;

  :first-child {
    border-top-left-radius: ${theme.size.xxsm};
  }

  :last-child {
    border-top-right-radius: ${theme.size.xxsm};
  }

  ${({ cssProps }) => cssProps}

  @media (max-width: 900px) {
    ${({ cssOnMedia }) => cssOnMedia}
  }
`;

export const TableColBody = styled.td<{
  textAlign?: string;
  cssProps: any;
  cssOnMedia: any;
}>`
  padding: 0 ${theme.size.xsm};
  height: 48px;
  text-align: start;
  white-space: nowrap;
  width: 25%;

  ${({ cssProps }) => cssProps}

  @media (max-width: 900px) {
    ${({ cssOnMedia }) => cssOnMedia}
  }
`;
