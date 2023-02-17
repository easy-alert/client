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
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.7fr 1fr;

  align-items: flex-end;
  gap: ${theme.size.xsm};
  max-width: 65%;

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
  grid-template-columns: repeat(3, 1fr);
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
  padding: 0 ${theme.size.md} ${theme.size.md} ${theme.size.md};
  border-radius: ${theme.size.xxsm};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
  scroll-snap-align: start;
  min-width: 300px;

  @media (max-width: 900px) {
    padding: 0 ${theme.size.sm} ${theme.size.sm} ${theme.size.sm};
  }
`;

export const KanbanHeader = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  padding: ${theme.size.md} 0 ${theme.size.xsm} 0;
  background-color: ${theme.color.white};

  @media (max-width: 900px) {
    padding: ${theme.size.sm} 0 ${theme.size.xsm} 0;
  }
`;

export const MaintenanceInfo = styled.div<{
  status: 'expired' | 'pending' | 'completed' | 'overdue';
}>`
  padding: ${theme.size.sm};
  background-color: ${theme.color.gray0};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
  border-radius: ${theme.size.xxsm};

  transition: 0.25s;

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }

  h6 {
    word-break: break-word;
  }

  > span {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    > h6 {
      max-width: calc(100% - 82px);
    }
  }

  ${({ status }) =>
    status === 'pending' &&
    css`
      p.p3 {
        color: ${theme.color.warning};
        font-weight: 500;
      }
    `}

  ${({ status }) =>
    status === 'expired' &&
    css`
      p.p3 {
        color: ${theme.color.actionDanger};
        font-weight: 500;
      }
    `}

    ${({ status }) =>
    status === 'overdue' &&
    css`
      p.p3 {
        color: ${theme.color.primaryM};
        font-weight: 500;
      }
    `}
`;

export const NoDataContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.color.gray4};
`;
