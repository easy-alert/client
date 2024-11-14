// REACT
import { useCallback, useEffect, useState } from 'react';

// LIBS
import { useParams, useSearchParams } from 'react-router-dom';

// HOOKS
import { useServiceTypes } from '@hooks/useServiceTypes';

// SERVICES
import { getTicketsByBuildingNanoId } from '@services/apis/getTicketsByBuildingNanoId';
import { putTicketById } from '@services/apis/putTicketById';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { Select } from '@components/Inputs/Select';
import { Button } from '@components/Buttons/Button';
import { Skeleton } from '@components/Skeleton';
import { EventTag } from '@components/EventTag';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';
import { formatDateString } from '@utils/dateFunctions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { ITicket } from '@customTypes/ITicket';

// COMPONENTS
import ModalTicketDetails from './ModalTicketDetails';
import { ModalCreateTicket } from './ModalCreateTicket';

// STYLES
import * as Style from './styles';

interface IKanbanTicket {
  title: string;
  tickets: ITicket[];
}

export interface ITicketFilter {
  year?: string;
  month?: string;
  status?: string;
  placeId?: string;
  serviceTypeId?: string;
  seen?: boolean;
}

interface ITicketFilterOptions {
  years: string[];
  months: {
    number: number;
    name: string;
  }[];
  status: {
    name: string;
    label: string;
  }[];
  places: {
    name: string;
    id: string;
  }[];
}

function TicketsPage() {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const { serviceTypes } = useServiceTypes({ buildingNanoId });

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [kanbanTickets, setKanbanTickets] = useState<IKanbanTicket[]>([]);
  const [buildingName, setBuildingName] = useState<string>('');
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<ITicketFilter>({
    year: '',
    month: '',
    status: '',
    placeId: '',
    serviceTypeId: '',
  });
  const [filterOptions, setFilterOptions] = useState<ITicketFilterOptions>({
    months: [],
    years: [],
    status: [],
    places: [],
  });

  const [ticketDetailsModal, setTicketDetailsModal] = useState<boolean>(false);
  const [createTicketModal, setCreateTicketModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleCreateKanbanTickets = useCallback((responseTickets: ITicket[]) => {
    const openTickets = responseTickets
      .filter((ticket) => ticket.status?.name === 'open')
      .sort((a, b) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime())
      .sort((a) => (a.seen ? 1 : -1));

    const inProgressTickets = responseTickets
      .filter((ticket) => ticket.status?.name === 'awaitingToFinish')
      .sort(
        (a, b) => new Date(b.updatedAt ?? '').getTime() - new Date(a.updatedAt ?? '').getTime(),
      );

    const finishedTickets = responseTickets
      .filter((ticket) => ticket.status?.name === 'finished')
      .sort(
        (a, b) => new Date(b.updatedAt ?? '').getTime() - new Date(a.updatedAt ?? '').getTime(),
      );

    const dismissedTickets = responseTickets
      .filter((ticket) => ticket.status?.name === 'dismissed')
      .sort(
        (a, b) => new Date(b.dismissedAt ?? '').getTime() - new Date(a.dismissedAt ?? '').getTime(),
      );

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

    setKanbanTickets(ticketsKanbanArray);
  }, []);

  // handle change functions
  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilter((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [filter, setFilter],
  );

  const handleFilterOptionsChange = useCallback(
    (key: string, value: string | string[]) => {
      setFilterOptions((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [filterOptions, setFilterOptions],
  );

  const handleSelectedTicketIdChange = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleSeenLocalKanbanTicket = (ticketId: string) => {
    const updatedTickets = kanbanTickets.map((kanban) => ({
      ...kanban,
      tickets: kanban.tickets.map((kt) => (kt.id === ticketId ? { ...kt, seen: true } : kt)),
    }));

    setKanbanTickets(updatedTickets);
  };

  // api functions
  const handleGetTickets = async () => {
    try {
      setLoading(true);

      const response = await getTicketsByBuildingNanoId({
        buildingNanoId,
        filter,
      });

      setBuildingName(response.buildingName);

      handleCreateKanbanTickets(response.tickets);
      setTickets(response.tickets);

      handleFilterOptionsChange('years', response.filterOptions.years);
      handleFilterOptionsChange('months', response.filterOptions.months);
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleUpdateOneTicket = async (updatedTicket: ITicket) => {
    try {
      await putTicketById(updatedTicket);
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setLoading(false);
    }
  };

  // modal functions
  const handleTicketDetailsModal = (modalState: boolean) => {
    setTicketDetailsModal(modalState);
  };

  const handleCreateTicketModal = (modalState: boolean) => {
    setCreateTicketModal(modalState);
  };

  useEffect(() => {
    handleGetTickets();
  }, [refresh]);

  return (
    <>
      {createTicketModal && (
        <ModalCreateTicket
          buildingNanoId={buildingNanoId}
          buildingName={buildingName}
          handleCreateTicketModal={handleCreateTicketModal}
          handleRefresh={handleRefresh}
        />
      )}

      {ticketDetailsModal && (
        <ModalTicketDetails
          ticketId={selectedTicketId}
          syndicNanoId={syndicNanoId}
          handleTicketDetailsModal={handleTicketDetailsModal}
          handleRefresh={handleRefresh}
        />
      )}

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

          {syndicNanoId && (
            <IconButton
              icon={icon.siren}
              label="Abrir chamado"
              onClick={() => handleCreateTicketModal(true)}
            />
          )}
        </Style.Header>

        {showFilter && (
          <Style.FilterWrapper>
            <Select
              selectPlaceholderValue=""
              label="Ano"
              value={filter.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="">Todos</option>

              {filterOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>

            <Select
              disabled={filter.year === ''}
              selectPlaceholderValue=""
              label="Mês"
              value={filter.month}
              onChange={(e) => handleFilterChange('month', e.target.value)}
            >
              <option value="">Todos</option>

              {filterOptions.months.map((month) => (
                <option key={month.number} value={month.number}>
                  {month.name}
                </option>
              ))}
            </Select>

            <Select
              selectPlaceholderValue=""
              label="Status"
              value={filter.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Todos</option>

              {filterOptions.status.map((status) => (
                <option key={status.name} value={status.name}>
                  {status.label}
                </option>
              ))}
            </Select>

            <Select
              label="Tipo"
              selectPlaceholderValue=""
              value={filter.serviceTypeId}
              onChange={(e) => handleFilterChange('serviceTypeId', e.target.value)}
            >
              <option value="">Todas</option>

              {serviceTypes.map((serviceType) => (
                <option key={serviceType.id} value={serviceType.id}>
                  {serviceType.singularLabel}
                </option>
              ))}
            </Select>

            <Select
              label="Local"
              selectPlaceholderValue=""
              value={filter.placeId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            >
              <option value="">Todas</option>

              {filterOptions.places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </Select>

            <Button
              type="button"
              label="Filtrar"
              disabled={loading}
              onClick={() => handleGetTickets()}
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
                  <Style.KanbanTicketWrapper
                    key={ticket.id}
                    onClick={() => {
                      if (!ticket.seen) {
                        handleUpdateOneTicket({ id: ticket.id, seen: true }).then(() =>
                          handleSeenLocalKanbanTicket(ticket.id),
                        );
                      }

                      handleSelectedTicketIdChange(ticket.id);
                      handleTicketDetailsModal(true);
                    }}
                  >
                    <Style.KanbanTicketInfo statusBgColor={ticket?.status?.backgroundColor}>
                      <Style.KanbanTicketInfoHeader>
                        <Style.KanbanTicketNumber>#{ticket.ticketNumber}</Style.KanbanTicketNumber>

                        {!ticket?.seen && <Style.KanbanTicketNewTag />}
                      </Style.KanbanTicketInfoHeader>

                      <Style.KanbanTicketGrid>
                        <Style.KanbanTicketGridBox>
                          <Style.KanbanTicketTitle>Morador</Style.KanbanTicketTitle>

                          <Style.KanbanTicketDescription>
                            {ticket.residentName}
                          </Style.KanbanTicketDescription>
                        </Style.KanbanTicketGridBox>

                        <Style.KanbanTicketGridBox>
                          <Style.KanbanTicketTitle>Tipo de manutenção</Style.KanbanTicketTitle>

                          {ticket.types?.map((type) => (
                            <EventTag
                              key={type.type.id}
                              label={type.type.label}
                              color={type.type.color}
                              bgColor={type.type.backgroundColor}
                            />
                          ))}
                        </Style.KanbanTicketGridBox>

                        <Style.KanbanTicketGridBox>
                          <Style.KanbanTicketTitle>Local da ocorrência</Style.KanbanTicketTitle>

                          <EventTag label={ticket.place?.label} />
                        </Style.KanbanTicketGridBox>

                        <Style.KanbanTicketGridBox>
                          <Style.KanbanTicketTitle>Data de abertura</Style.KanbanTicketTitle>

                          <Style.KanbanTicketDescription>
                            {ticket.createdAt &&
                              formatDateString(ticket.createdAt, 'dd/MM/yyyy - HH:mm')}
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
    </>
  );
}

export default TicketsPage;
