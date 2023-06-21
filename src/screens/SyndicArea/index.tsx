/* eslint-disable react/no-array-index-key */
// LIBS
import { useState, useEffect } from 'react';

// COMPONENTS
import { Button } from '../../components/Buttons/Button';
import { IconButton } from '../../components/Buttons/IconButton';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { ModalMaintenanceDetails } from '../MaintenancesPlan/ModalMaintenanceDetails';
import { ModalSendMaintenanceReport } from './ModalSendMaintenanceReport';
import { Skeleton } from '../../components/Skeleton';

// FUNCTIONS
import { requestSyndicKanban } from './functions';
import { capitalizeFirstLetter, dateFormatter, query } from '../../utils/functions';

// TYPES
import { IFilter, IFilterOptions, IKanban } from './types';
import { IModalAdditionalInformations } from '../MaintenancesPlan/types';

// STYLES
import { icon } from '../../assets/icons';
import { theme } from '../../styles/theme';
import * as Style from './styles';
import { FutureMaintenanceTag } from '../../components/FutureMaintenanceTag';

export const SyndicArea = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [showFutureMaintenances, setShowFutureMaintenances] = useState<boolean>(true);

  const [showOldExpireds, setShowOldExpireds] = useState<boolean>(false);

  const [modalSendReportOpen, setModalSendReportOpen] = useState<boolean>(false);

  const [modalMaintenanceDetailsOpen, setModalMaintenanceDetailsOpen] = useState<boolean>(false);

  const [kanban, setKanban] = useState<IKanban[]>([]);

  const [buildingName, setBuildingName] = useState<string>('');

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

  const [filter, setFilter] = useState<IFilter>({
    months: '',
    status: '',
    years: '',
  });

  const syndicNanoId = query.get('syndicNanoId') ?? '';

  useEffect(() => {
    requestSyndicKanban({
      setLoading,
      syndicNanoId,
      setFilterOptions,
      filter,
      setOnQuery,
      setKanban,
      setBuildingName,
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalSendReportOpen && (
        <ModalSendMaintenanceReport
          modalAdditionalInformations={modalAdditionalInformations}
          setModal={setModalSendReportOpen}
          filter={filter}
          setBuildingName={setBuildingName}
          setFilterOptions={setFilterOptions}
          setKanban={setKanban}
          setLoading={setLoading}
          syndicNanoId={syndicNanoId}
        />
      )}
      {modalMaintenanceDetailsOpen && (
        <ModalMaintenanceDetails
          setModal={setModalMaintenanceDetailsOpen}
          modalAdditionalInformations={modalAdditionalInformations}
        />
      )}

      <Style.Container>
        <Style.Header>
          <h2>{buildingName}</h2>
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

                  if (prevState.months !== '' && newState.years === '') {
                    newState.months = '';
                  }

                  return newState;
                });
              }}
            >
              <option value="">Todos</option>
              {filterOptions.years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Select
              disabled={onQuery || filter.years === ''}
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
                <option key={option.name} value={option.name}>
                  {capitalizeFirstLetter(option.label)}
                </option>
              ))}
            </Select>
            <Button
              type="button"
              label="Filtrar"
              disable={onQuery}
              onClick={() => {
                requestSyndicKanban({
                  setLoading,
                  syndicNanoId,
                  setFilterOptions,
                  filter,
                  setOnQuery,
                  setKanban,
                  setBuildingName,
                });
              }}
            />
          </Style.FilterWrapper>
        )}
        <Style.Kanban>
          {kanban.map((card, i: number) => (
            <Style.KanbanCard key={card.status}>
              <Style.KanbanHeader>
                <h5>{card.status}</h5>
                {card.status === 'Pendentes' && (
                  <label htmlFor="showFuture">
                    <input
                      type="checkbox"
                      id="showFuture"
                      checked={showFutureMaintenances}
                      onChange={() => {
                        setShowFutureMaintenances((prevState) => !prevState);
                      }}
                    />
                    Mostrar futuras
                  </label>
                )}
                {card.status === 'Vencidas' && (
                  <label htmlFor="showExpireds">
                    <input
                      type="checkbox"
                      id="showExpireds"
                      checked={showOldExpireds}
                      onChange={() => {
                        setShowOldExpireds((prevState) => !prevState);
                      }}
                    />
                    Mostrar expiradas
                  </label>
                )}
              </Style.KanbanHeader>

              {onQuery && (
                <>
                  {(i === 0 || i === 1 || i === 2) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}
                  {(i === 0 || i === 1 || i === 2) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}
                  {(i === 0 || i === 2) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}
                  {i === 2 && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}
                </>
              )}

              {!onQuery &&
                card.maintenances.length > 0 &&
                card.maintenances.map((maintenance, j: number) => {
                  const isPending = maintenance.status === 'pending';
                  const isFuture =
                    new Date(maintenance.date) > new Date(new Date().setHours(0, 0, 0, 0));

                  const isExpired = maintenance.status === 'expired';
                  const isOldExpired =
                    maintenance.status === 'expired' && maintenance.cantReportExpired;

                  return (
                    ((showFutureMaintenances && isPending && isFuture) ||
                      (isPending && !isFuture) ||
                      !isPending) &&
                    ((showOldExpireds && isExpired && isOldExpired) ||
                      (isExpired && !isOldExpired) ||
                      !isExpired) && (
                      <Style.MaintenanceWrapper key={maintenance.id + j}>
                        <Style.MaintenanceInfo
                          status={maintenance.status}
                          onClick={() => {
                            setModalAdditionalInformations({
                              id: maintenance.id,
                              expectedNotificationDate: '',
                              expectedDueDate: '',
                              isFuture: false,
                            });

                            if (
                              maintenance.status === 'pending' ||
                              maintenance.status === 'expired'
                            ) {
                              setModalSendReportOpen(true);
                            } else {
                              setModalMaintenanceDetailsOpen(true);
                            }
                          }}
                        >
                          <h6>
                            {maintenance.type === 'occasional' && <EventTag status="occasional" />}
                            {maintenance.status === 'pending' &&
                              new Date(maintenance.date) >
                                new Date(new Date().setHours(0, 0, 0, 0)) && (
                                <FutureMaintenanceTag />
                              )}
                            {maintenance.status === 'overdue' && <EventTag status="overdue" />}

                            {maintenance.element}
                          </h6>
                          <p className="p2">{maintenance.activity}</p>
                          <p className="p3">
                            {maintenance.status === 'pending' && maintenance.label}
                            {maintenance.status === 'expired' && !isOldExpired && maintenance.label}

                            {(maintenance.status === 'completed' ||
                              maintenance.status === 'overdue') &&
                              `Concluída em ${dateFormatter(maintenance.date)}`}
                          </p>
                        </Style.MaintenanceInfo>
                      </Style.MaintenanceWrapper>
                    )
                  );
                })}

              {!onQuery &&
                (card.maintenances.length === 0 ||
                  (!showFutureMaintenances &&
                    card.maintenances.every(
                      (maintenance) =>
                        maintenance.status === 'pending' &&
                        new Date(maintenance.date) > new Date(new Date().setHours(0, 0, 0, 0)),
                    )) ||
                  (!showOldExpireds &&
                    card.maintenances.every(
                      (maintenance) => maintenance.cantReportExpired === true,
                    ))) && (
                  <Style.NoDataContainer>
                    <h4>Nenhuma manutenção encontrada.</h4>
                  </Style.NoDataContainer>
                )}
            </Style.KanbanCard>
          ))}
        </Style.Kanban>
      </Style.Container>
    </>
  );
};
