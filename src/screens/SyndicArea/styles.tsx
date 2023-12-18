import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.xxsm};

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};

  @media (max-width: 600px) {
    gap: ${theme.size.sm};
  }

  > label {
    display: flex;
    align-items: center;
    gap: ${theme.size.xxsm};

    cursor: pointer;
    color: ${theme.color.gray4};
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.5fr 2.5fr 1fr;

  align-items: flex-end;
  gap: ${theme.size.xsm};
  max-width: 70%;

  > :last-child {
    margin-left: ${theme.size.xsm};
  }

  @media (max-width: 900px) {
    max-width: 100%;
    grid-template-columns: 1fr;

    background-color: ${theme.color.white};
    padding: ${theme.size.sm};
    border-radius: ${theme.size.xxsm};

    > :last-child {
      margin-left: auto;
      margin-top: ${theme.size.xsm};
    }
  }
`;

export const Kanban = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.size.sm};
  overflow: auto;
  height: 100%;
  scrollbar-width: none;
  scrollbar-color: transparent;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const KanbanCard = styled.div`
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
  scroll-snap-align: start;
  min-width: 300px;
  overflow: auto;
  padding-bottom: ${theme.size.sm};

  scrollbar-width: none;
  scrollbar-color: transparent;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const KanbanHeader = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${theme.color.white};
  z-index: 9;
  padding: ${theme.size.sm} ${theme.size.sm} ${theme.size.xsm} ${theme.size.sm};
  border-radius: ${theme.size.xxsm};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.size.sm};

  > label {
    display: flex;
    align-items: center;
    gap: ${theme.size.xxsm};

    cursor: pointer;
    color: ${theme.color.gray4};
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
`;

export const MaintenanceWrapper = styled.div`
  padding: 0 ${theme.size.sm} 0 ${theme.size.sm};
`;

export const MaintenanceInfo = styled.div<{
  status: 'expired' | 'pending' | 'completed' | 'overdue';
}>`
  padding: ${theme.size.sm} ${theme.size.sm} ${theme.size.sm} 23px;
  background-color: ${theme.color.gray0};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
  border-radius: ${theme.size.xxsm};

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }

  > h6 {
    > span {
      display: flex;
      align-items: center;
      gap: ${theme.size.xxsm};
      flex-wrap: wrap;
      margin-bottom: 4px;
    }
  }

  word-break: break-word;

  ${({ status }) =>
    status === 'pending' &&
    css`
      p.p3 {
        color: ${theme.color.warning};
        font-weight: 500;
      }
      background: linear-gradient(
        90deg,
        rgba(255, 178, 0, 1) 0%,
        rgba(255, 178, 0, 1) 7px,
        rgba(250, 250, 250, 1) 7px,
        rgba(250, 250, 250, 1) 100%
      );
    `}

  ${({ status }) =>
    status === 'expired' &&
    css`
      p.p3 {
        color: ${theme.color.actionDanger};
        font-weight: 500;
      }
      background: linear-gradient(
        90deg,
        rgba(255, 53, 8, 1) 0%,
        rgba(255, 53, 8, 1) 7px,
        rgba(250, 250, 250, 1) 7px,
        rgba(250, 250, 250, 1) 100%
      );
    `}

    ${({ status }) =>
    (status === 'overdue' || status === 'completed') &&
    css`
      p.p3 {
        color: ${theme.color.success};
        font-weight: 500;
      }
    `}

    ${({ status }) =>
    (status === 'completed' || status === 'overdue') &&
    css`
      background: linear-gradient(
        90deg,
        rgba(52, 181, 58, 1) 0%,
        rgba(52, 181, 58, 1) 7px,
        rgba(250, 250, 250, 1) 7px,
        rgba(250, 250, 250, 1) 100%
      );
    `}
`;

export const NoDataContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.color.gray4};
  padding: 0 ${theme.size.sm} 0 ${theme.size.sm};
`;
