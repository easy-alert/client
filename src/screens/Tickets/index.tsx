import { useCallback, useEffect, useState } from 'react';

import { getTicketsByBuildingNanoId } from '@services/apis/getTicketsByBuildingNanoId';

import { useParams, useSearchParams } from 'react-router-dom';

import { IconButton } from '@components/Buttons/IconButton';

import { icon } from '@assets/icons';

import { theme } from '@styles/theme';

import type { ITicket, ITicketStatus } from '@customTypes/ITicket';

import { handleToastify } from '@utils/toastifyResponses';
import { Input } from '@components/Inputs/Input';
import { Select } from '@components/Inputs/Select';
import { Button } from '@components/Buttons/Button';
import { Skeleton } from '@components/Skeleton';
import { EventTag } from '@components/EventTag';
import { dateFormatter } from '@utils/functions';
import * as Style from './styles';

interface ITicketsFilterOptions {
  initialCreatedAt: string;
  finalCreatedAt: string;
  statusName: string;
}

interface IKanbanTicket {
  title: string;
  tickets: ITicket[];
}

function TicketsPage() {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search;

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [kanbanTickets, setKanbanTickets] = useState<IKanbanTicket[]>([]);
  const [buildingName, setBuildingName] = useState<string>('');
  const [statusOptions, setStatusOptions] = useState<ITicketStatus[]>([]);

  const [ticketsToAnswer, setTicketsToAnswer] = useState<ITicket[]>([]);

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<ITicketsFilterOptions>({
    initialCreatedAt: '',
    finalCreatedAt: '',
    statusName: '',
  });

  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFilterOptionsChange = useCallback(
    (key: string, value: string) => {
      setFilterOptions((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [filterOptions, setFilterOptions],
  );

  const handleCreateKanbanTickets = useCallback((responseTickets: ITicket[]) => {
    const openTickets = responseTickets
      .filter((ticket) => ticket.statusName === 'open')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const inProgressTickets = responseTickets
      .filter((ticket) => ticket.statusName === 'inProgress')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const finishedTickets = responseTickets
      .filter((ticket) => ticket.statusName === 'finished')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const dismissedTickets = responseTickets
      .filter((ticket) => ticket.statusName === 'dismissed')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const ticketsKanbanArray = [
      {
        title: 'Abertos',
        tickets: openTickets,
      },
      {
        title: 'Em execução',
        tickets: inProgressTickets,
      },
      {
        title: 'Concluídos',
        tickets: finishedTickets,
      },
      {
        title: 'Indeferidos',
        tickets: dismissedTickets,
      },
    ];

    console.log('🚀 ~ handleCreateKanbanTickets ~ ticketsKanbanArray:', ticketsKanbanArray);

    setKanbanTickets(ticketsKanbanArray);
  }, []);

  const handleGetTickets = async (pageParam?: number) => {
    try {
      setLoading(true);

      const response = await getTicketsByBuildingNanoId({
        buildingNanoId,
        page: pageParam || page,
        take,
      });

      handleCreateKanbanTickets(response.tickets);

      setBuildingName(response.buildingName);
      setStatusOptions(response.status);
      setTickets(response.tickets);
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTickets();
  }, []);

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderWrapper>
          <h2>Chamados{buildingName ? ` / ${buildingName}` : ''}</h2>

          <Style.HeaderSide>
            <IconButton
              icon={icon.filter}
              size="16px"
              label={showFilter ? 'Ocultar' : 'Filtrar'}
              color={theme.color.gray5}
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            />
          </Style.HeaderSide>
        </Style.HeaderWrapper>

        {/* {syndicNanoId && (
          <IconButton
            icon={icon.siren}
            label="Responder chamados"
            onClick={() => {
              if (ticketsToAnswer.length === 0) {
                handleToastify({
                  statusCode: 400,
                  message: 'Selecione pelo menos um chamado.',
                });
              }
            }}
          />
        )} */}
      </Style.Header>

      {showFilter && (
        <Style.FilterWrapper>
          <Input
            label="Data inicial"
            type="date"
            value={filterOptions.initialCreatedAt}
            onChange={(e) => {
              handleFilterOptionsChange('initialCreatedAt', e.target.value);
            }}
          />

          <Input
            label="Data final"
            type="date"
            value={filterOptions.finalCreatedAt}
            onChange={(e) => {
              handleFilterOptionsChange('finalCreatedAt', e.target.value);
            }}
          />

          <Select
            selectPlaceholderValue={' '}
            label="Status"
            value={filterOptions.statusName}
            onChange={(evt) => {
              handleFilterOptionsChange('statusName', evt.target.value);
            }}
          >
            <option value="">Todos</option>
            {statusOptions.map(({ label, name }) => (
              <option key={name} value={name}>
                {label}
              </option>
            ))}
          </Select>

          <Button
            type="button"
            label="Filtrar"
            disabled={loading}
            onClick={() => {
              setPage(1);
              handleGetTickets(1);
            }}
          />
        </Style.FilterWrapper>
      )}

      <Style.Kanban>
        {kanbanTickets.map((kanbanTicket, i: number) => (
          <Style.KanbanCard key={kanbanTicket.title}>
            <Style.KanbanHeader>
              <h5>{kanbanTicket.title}</h5>
              <span>{kanbanTicket.tickets.length}</span>
            </Style.KanbanHeader>

            {loading && (
              <>
                {(i === 1 || i === 2 || i === 3) && (
                  <Style.KanbanTicketWrapper>
                    <Skeleton />
                  </Style.KanbanTicketWrapper>
                )}

                {(i === 0 || i === 1 || i === 2 || i === 3) && (
                  <Style.KanbanTicketWrapper>
                    <Skeleton />
                  </Style.KanbanTicketWrapper>
                )}

                {(i === 0 || i === 2 || i === 3) && (
                  <Style.KanbanTicketWrapper>
                    <Skeleton />
                  </Style.KanbanTicketWrapper>
                )}

                {i === 3 && (
                  <Style.KanbanTicketWrapper>
                    <Skeleton />
                  </Style.KanbanTicketWrapper>
                )}
              </>
            )}

            {!loading &&
              kanbanTicket.tickets.length > 0 &&
              kanbanTicket.tickets.map((ticket) => (
                <Style.KanbanTicketWrapper key={ticket.id}>
                  <Style.KanbanTicketInfo statusBgColor={ticket.status.backgroundColor}>
                    <Style.KanbanTicketNumber>#{ticket.ticketNumber}</Style.KanbanTicketNumber>

                    <Style.KanbanTicketGrid>
                      <Style.KanbanTicketGridBox>
                        <Style.KanbanTicketTitle>Morador</Style.KanbanTicketTitle>

                        <Style.KanbanTicketDescription>
                          {ticket.residentName}
                        </Style.KanbanTicketDescription>
                      </Style.KanbanTicketGridBox>

                      <Style.KanbanTicketGridBox>
                        <Style.KanbanTicketTitle>Tipo de manutenção</Style.KanbanTicketTitle>

                        {ticket.types.map((type) => (
                          <EventTag key={type.type.id} label={type.type.label} />
                        ))}
                      </Style.KanbanTicketGridBox>

                      <Style.KanbanTicketGridBox>
                        <Style.KanbanTicketTitle>Local da ocorrência</Style.KanbanTicketTitle>

                        <EventTag label={ticket.place.label} />
                      </Style.KanbanTicketGridBox>

                      <Style.KanbanTicketGridBox>
                        <Style.KanbanTicketTitle>Data de abertura</Style.KanbanTicketTitle>

                        <Style.KanbanTicketDescription>
                          {dateFormatter(ticket.createdAt)}
                        </Style.KanbanTicketDescription>
                      </Style.KanbanTicketGridBox>
                    </Style.KanbanTicketGrid>
                  </Style.KanbanTicketInfo>
                </Style.KanbanTicketWrapper>
              ))}
          </Style.KanbanCard>
        ))}
      </Style.Kanban>
    </Style.Container>
  );
}

export default TicketsPage;
