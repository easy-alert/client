import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  height: 100%;
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  overflow-x: auto;
  height: 100%;

  scrollbar-width: none;
  scrollbar-color: transparent;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const KanbanCard = styled.div`
  background-color: ${theme.color.white};
  padding: ${theme.size.md};
  border-radius: ${theme.size.xxsm};
  min-width: 340px;
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const MaintenanceInfo = styled.div`
  padding: ${theme.size.sm};
  background-color: ${theme.color.gray0};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

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
`;
