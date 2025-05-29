// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useParams, useSearchParams } from 'react-router-dom';
import { usePrevious } from 'react-use';

// HOOKS
import { useTicketStatus } from '@hooks/useTicketStatus';
import { useMaintenanceCategoriesForSelect } from '@hooks/useMaintenanceCategoriesForSelect';

// COMPONENTS
import { Button } from '@components/Buttons/Button';
import { IconButton } from '@components/Buttons/IconButton';
import { EventTag } from '@components/EventTag';
import { Select } from '@components/Inputs/Select';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { InProgressTag } from '@components/InProgressTag';
import ModalTicketDetails from '@components/ModalTicketDetails';

// GLOBAL UTILS
import { capitalizeFirstLetter } from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// COMPONENTS
import { ModalMaintenanceDetails } from './ModalMaintenanceDetails';

// UTILS
import { requestMaintenancesPlan } from './functions';

// STYLES
import * as Style from './styles';

// TYPES
import type {
  IBuilding,
  IFilter,
  IFilterOptions,
  IMaintenancesPlan,
  IModalAdditionalInformations,
} from './types';

// FUNCTIONS

export const MaintenancesPlan = () => {
  const { ticketStatus } = useTicketStatus({ statusName: 'all' });
  const { buildingId } = useParams() as { buildingId: string };
  const { maintenanceCategoriesForSelect } = useMaintenanceCategoriesForSelect({
    companyId: '',
    buildingId,
    userId: '',
  });

  const [search] = useSearchParams();
  const syndicNanoId = search.get('syndicNanoId') ?? '';

  const [building, setBuilding] = useState<IBuilding>({ Banners: [], name: '' });

  const [maintenancesPlan, setMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);
  const [filteredMaintenancesPlan, setFilteredMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [ticketDetailsModal, setTicketDetailsModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [modalAdditionalInformations, setModalAdditionalInformations] =
    useState<IModalAdditionalInformations>({
      id: '',
      expectedNotificationDate: '',
      expectedDueDate: '',
      isFuture: false,
    });

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    months: [],
    status: [],
    years: [],
  });

  const currentYear = new Date().getFullYear();

  const [filter, setFilter] = useState<IFilter>({
    years: String(currentYear),
    months: '',
    category: '',
    status: '',
  });

  const [modalMaintenanceDetailsOpen, setModalMaintenanceDetailsOpen] = useState<boolean>(false);

  const prevFilter = usePrevious(filter);

  const filterFunction = () => {
    let filtered: IMaintenancesPlan[] = [];

    maintenancesPlan.forEach((maintenance) => {
      filtered.push({
        ...maintenance,
        dates: maintenance.dates.filter((date) => date.dateInfos.year === Number(filter.years)),
      });
    });

    if (filter.months !== '') {
      filtered = filtered.filter((maintenance) => maintenance.monthNumber === filter.months);
    }

    const filteredStatus: IMaintenancesPlan[] = [];

    if (filter.status !== '') {
      filtered.forEach((maintenance) => {
        filteredStatus.push({
          ...maintenance,
          dates: maintenance.dates.filter((date) => date.status === filter.status),
        });
      });
    }

    if (filter.category !== '') {
      filtered.forEach((maintenance) => {
        filteredStatus.push({
          ...maintenance,
          dates: maintenance.dates.filter(
            (date) => date.categoryId === filter.category || date.categoryId === filter.category,
          ),
        });
      });
    }

    setFilteredMaintenancesPlan(filteredStatus.length ? filteredStatus : filtered);
  };

  const handleTicketDetailsModal = (modalState: boolean) => {
    setTicketDetailsModal(modalState);
  };

  useEffect(() => {
    requestMaintenancesPlan({
      buildingId,
      setLoading,
      setMaintenancesPlan,
      setFilteredMaintenancesPlan,
      setBuilding,
      setFilterOptions,
      year: String(currentYear),
      setOnQuery,
      currentYear,
      month: filter.months,
      status: filter.status,
    });
  }, []);

  useEffect(() => {
    if (maintenancesPlan.find((month) => month.dates.find((date) => date.type === 'ticket'))) {
      setFilterOptions((prevState) => {
        const newState = { ...prevState };
        const formattedTicketStatus = ticketStatus.map((status) => ({
          name: status.name,
          label: status.label || '',
        }));
        newState.status = [...formattedTicketStatus, ...prevState.status];
        return newState;
      });
    }
  }, [maintenancesPlan]);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalMaintenanceDetailsOpen && (
        <ModalMaintenanceDetails
          setModal={setModalMaintenanceDetailsOpen}
          modalAdditionalInformations={modalAdditionalInformations}
        />
      )}

      {ticketDetailsModal && (
        <ModalTicketDetails
          ticketId={modalAdditionalInformations.id}
          syndicNanoId={syndicNanoId}
          handleTicketDetailsModal={handleTicketDetailsModal}
        />
      )}

      <Style.Container>
        <h2>{building.name}</h2>

        {building.Banners.map(
          (banner) =>
            banner.type === 'Web' && (
              <Style.WebBanner
                redirectUrl={banner.redirectUrl}
                key={banner.id}
                src={banner.url}
                alt="Web banner"
                onClick={() => {
                  if (banner.redirectUrl) {
                    window.open(banner.redirectUrl, '_blank');
                  }
                }}
              />
            ),
        )}

        {building.Banners.map(
          (banner) =>
            banner.type === 'Mobile' && (
              <Style.MobileBanner
                key={banner.id}
                src={banner.url}
                alt="Mobile banner"
                onClick={() => {
                  if (banner.redirectUrl) {
                    window.open(banner.redirectUrl, '_blank');
                  }
                }}
              />
            ),
        )}

        <Style.Card>
          <Style.CardHeader>
            <Style.Header>
              <h4>Plano de manutenção</h4>

              <IconButton
                icon={icon.filter}
                size="16px"
                label={showFilter ? 'Ocultar' : 'Filtrar'}
                color={theme.color.gray5}
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
              />
            </Style.Header>

            {showFilter && (
              <Style.FilterWrapper>
                <Select
                  disabled={onQuery}
                  selectPlaceholderValue={' '}
                  label="Ano"
                  value={filter.years}
                  onChange={(e) => {
                    setFilter((prevState) => {
                      const newState = { ...prevState };
                      newState.years = e.target.value;
                      return newState;
                    });
                  }}
                >
                  {filterOptions.years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>

                <Select
                  disabled={onQuery}
                  selectPlaceholderValue={' '}
                  label="Mês"
                  value={filter.months}
                  onChange={(e) => {
                    setFilter((prevState) => {
                      const newState = { ...prevState };
                      newState.months = e.target.value;
                      return newState;
                    });
                  }}
                >
                  <option value="">Todos</option>
                  {filterOptions.months.map((option) => (
                    <option key={option.monthNumber} value={option.monthNumber}>
                      {capitalizeFirstLetter(option.label)}
                    </option>
                  ))}
                </Select>

                <Select
                  disabled={onQuery}
                  selectPlaceholderValue={' '}
                  label="Categoria"
                  value={filter.category}
                  onChange={(e) => {
                    setFilter((prevState) => {
                      const newState = { ...prevState };
                      newState.category = e.target.value;
                      return newState;
                    });
                  }}
                >
                  <option value="">Todas</option>

                  {maintenanceCategoriesForSelect.map((category) => (
                    <option key={category.id} value={category.id}>
                      {capitalizeFirstLetter(category?.name || '')}
                    </option>
                  ))}
                </Select>

                <Select
                  disabled={onQuery}
                  selectPlaceholderValue={' '}
                  label="Status"
                  value={filter.status}
                  onChange={(e) => {
                    setFilter((prevState) => {
                      const newState = { ...prevState };
                      newState.status = e.target.value;
                      return newState;
                    });
                  }}
                >
                  <option value="">Todos</option>
                  {filterOptions.status.map((option) => (
                    <option key={String(option.name)} value={String(option.name)}>
                      {capitalizeFirstLetter(option.label)}
                    </option>
                  ))}
                </Select>

                <Button
                  type="button"
                  label="Filtrar"
                  disable={onQuery}
                  onClick={() => {
                    if (
                      Number(filter.years) < currentYear ||
                      Number(prevFilter?.years) < currentYear
                    ) {
                      requestMaintenancesPlan({
                        buildingId,
                        setLoading,
                        setMaintenancesPlan,
                        setFilteredMaintenancesPlan,
                        setBuilding,
                        setFilterOptions,
                        year: filter.years,
                        setOnQuery,
                        currentYear,
                        month: filter.months,
                        status: filter.status,
                      });
                    } else {
                      filterFunction();
                    }
                  }}
                />
              </Style.FilterWrapper>
            )}
          </Style.CardHeader>

          <Style.CalendarWrapper>
            {onQuery && (
              <Style.LoadingContainer>
                <DotSpinLoading />
              </Style.LoadingContainer>
            )}

            {filteredMaintenancesPlan.length > 0 &&
              !onQuery &&
              filteredMaintenancesPlan.map((month) => (
                <Style.MonthSection key={month.name}>
                  <h5>{month.name}</h5>

                  {month.dates.length > 0 ? (
                    month.dates.map((maintenance) => (
                      <Style.DayWrapper
                        key={maintenance.id + maintenance.dateInfos.dayNumber}
                        onClick={() => {
                          if (maintenance.type === 'ticket') {
                            setModalAdditionalInformations({
                              id: maintenance.id,
                              expectedNotificationDate: '',
                              isFuture: false,
                              expectedDueDate: '',
                            });

                            setTicketDetailsModal(true);
                          } else {
                            setModalAdditionalInformations({
                              id: maintenance.id,
                              expectedNotificationDate:
                                maintenance.expectedNotificationDate ?? null,
                              isFuture: maintenance.isFuture,
                              expectedDueDate: maintenance.expectedDueDate ?? null,
                            });
                            setModalMaintenanceDetailsOpen(true);
                          }
                        }}
                      >
                        <Style.DayInfo>
                          <p className="p3">{maintenance.dateInfos.dayNumber}</p>
                          <p className="p3">{maintenance.dateInfos.smName}</p>
                        </Style.DayInfo>
                        <Style.Maintenance
                          status={maintenance.status}
                          bgColor={maintenance?.statusBgColor}
                        >
                          <Style.MaintenanceTags>
                            {maintenance.status === 'overdue' && <EventTag status="completed" />}

                            <EventTag
                              status={maintenance.statusLabel || maintenance.status}
                              color={maintenance?.statusColor}
                              bgColor={maintenance?.statusBgColor}
                            />

                            <EventTag status={maintenance.type} />

                            {(maintenance.status === 'expired' ||
                              maintenance.status === 'pending') &&
                              maintenance.inProgress &&
                              !maintenance.isFuture && <InProgressTag />}
                          </Style.MaintenanceTags>

                          <h6>{maintenance.element}</h6>

                          <p className="p2">{maintenance.activity}</p>
                        </Style.Maintenance>
                      </Style.DayWrapper>
                    ))
                  ) : (
                    <Style.NoDataDayWrapper>
                      <Style.DayInfo />
                      <Style.NoMaintenanceCard>
                        <h6>Sem manutenções</h6>
                      </Style.NoMaintenanceCard>
                    </Style.NoDataDayWrapper>
                  )}
                </Style.MonthSection>
              ))}

            {filteredMaintenancesPlan.length === 0 && !onQuery && (
              <Style.NoDataContainer>
                <h4>Nenhuma manutenção encontrada.</h4>
              </Style.NoDataContainer>
            )}
          </Style.CalendarWrapper>
        </Style.Card>
      </Style.Container>
    </>
  );
};
