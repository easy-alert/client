// REACT
import { useState, useEffect } from 'react';

// LIBS
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// HOOKS
import { useUserData } from '@hooks/useUserData';
import { useMaintenanceStatusForSelect } from '@hooks/useMaintenanceStatusForSelect';

// SERVICES
import { getBuildingsBySyndicId } from '@services/apis/getBuildingsBySyndicId';
import { getMaintenancesKanban } from '@services/apis/getMaintenancesKanban';

// GLOBAL COMPONENTS
import { Button } from '@components/Buttons/Button';
import { IconButton } from '@components/Buttons/IconButton';
import { EventTag } from '@components/EventTag';
import { Select } from '@components/Inputs/Select';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Skeleton } from '@components/Skeleton';
import { FutureMaintenanceTag } from '@components/FutureMaintenanceTag';
import { ModalCreateOccasionalMaintenance } from '@components/ModalCreateOccasionalMaintenance';

// GLOBAL UTILS
import { capitalizeFirstLetter, catchHandler, dateFormatter } from '@utils/functions';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// COMPONENTS
import { Form, Formik } from 'formik';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikInput } from '@components/Form/FormikInput';
import { ListTag } from '@components/ListTag';

import { useBuildingsForSelect } from '@hooks/useBuildingsForSelect';
import { ModalMaintenanceDetails } from '../MaintenancesPlan/ModalMaintenanceDetails';
import { ModalSendMaintenanceReport } from './ModalSendMaintenanceReport';
import { ModalChecklistCreate } from './ModalChecklistCreate';
import { ModalChecklistDetails } from './ModalChecklistDetails';

// STYLES
import * as Style from './styles';

// TYPES
import type { IKanban } from './types';
import type { IModalAdditionalInformations } from '../MaintenancesPlan/types';

interface IBuildingsBySyndic {
  buildingName: string;
  syndicNanoId: string;
  syndicName: string;
  buildingNanoId: string;
  companyName: string;
  label: string;
}

export interface IMaintenanceFilter {
  buildings: string[];
  status: string[];
  categories: string[];
  users: string[];
  priorityName: string;
  startDate?: string;
  endDate?: string;
}

interface IMaintenanceCategoryForSelect {
  id: string;
  name: string;
}

export type TModalNames =
  | 'modalSendMaintenanceReport'
  | 'modalMaintenanceDetails'
  | 'modalCreateOccasionalMaintenance'
  | 'modalChecklistCreate'
  | 'modalChecklistDetails';

export const SyndicArea = () => {
  const navigate = useNavigate();
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const { maintenanceStatusForSelect } = useMaintenanceStatusForSelect();

  const [buildingName, setBuildingName] = useState<string>('');
  const [buildingsBySyndic, setBuildingsBySyndic] = useState<IBuildingsBySyndic[]>([]);

  const [maintenanceHistoryId, setMaintenanceHistoryId] = useState<string>('');
  const [kanban, setKanban] = useState<IKanban[]>([]);

  const [modalAdditionalInformations, setModalAdditionalInformations] =
    useState<IModalAdditionalInformations>({
      id: '',
      expectedNotificationDate: '',
      expectedDueDate: '',
      isFuture: false,
    });

  const [modalMaintenanceSendReport, setModalMaintenanceSendReport] = useState<boolean>(false);
  const [modalMaintenanceDetails, setModalMaintenanceDetails] = useState<boolean>(false);
  const [modalCreateOccasionalMaintenance, setModalCreateOccasionalMaintenance] =
    useState<boolean>(false);

  const [showFutureMaintenances, setShowFutureMaintenances] = useState<boolean>(false);
  const [showOldExpireds, setShowOldExpireds] = useState<boolean>(false);

  const [search] = useSearchParams();
  const userId = search.get('userId') ?? '';
  const syndicNanoId = search.get('syndicNanoId') ?? '';
  const buildingId = search.get('buildingId') ?? '';

  const { buildingsForSelect } = useBuildingsForSelect({ userId, checkPerms: true });
  const { userData } = useUserData({ userId });

  const [maintenanceCategoriesForSelect, setMaintenanceCategoriesForSelect] = useState<
    IMaintenanceCategoryForSelect[]
  >([]);
  const [filter, setFilter] = useState<IMaintenanceFilter>({
    buildings: [],
    status: [],
    categories: [],
    users: [],
    priorityName: '',
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [showPriority, setShowPriority] = useState<boolean>(false);

  // # region Checklists states
  const [checklistId, setChecklistId] = useState<string>('');

  const [modalChecklistCreate, setModalChecklistCreate] = useState(false);
  const [modalChecklistDetails, setModalChecklist] = useState(false);
  // # endregion

  const handleModals = (modal: TModalNames, modalState: boolean) => {
    switch (modal) {
      case 'modalSendMaintenanceReport':
        setModalMaintenanceSendReport(modalState);
        break;
      case 'modalMaintenanceDetails':
        setModalMaintenanceDetails(modalState);
        break;
      case 'modalCreateOccasionalMaintenance':
        setModalCreateOccasionalMaintenance(modalState);
        break;
      case 'modalChecklistCreate':
        setModalChecklistCreate(modalState);
        break;
      case 'modalChecklistDetails':
        setModalChecklist(modalState);
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  const handleQuery = (queryState: boolean) => {
    setOnQuery(queryState);
  };

  const handleMaintenanceHistoryIdChange = (id: string) => {
    setMaintenanceHistoryId(id);
  };

  // region filter functions
  const handleFilterChange = (key: keyof IMaintenanceFilter, value: string) => {
    setFilter((prevState) => {
      const checkArray = Array.isArray(prevState[key]);
      const newFilter = { ...prevState, [key]: value };

      if (checkArray) {
        return {
          ...newFilter,
          [key]: [...(prevState[key] as string[]), value],
        };
      }

      return newFilter;
    });
  };

  const handleClearFilter = () => {
    setFilter({
      buildings: [],
      status: [],
      categories: [],
      users: [],
      priorityName: '',
      startDate: new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    });
  };
  // endregion

  // region api functions
  const handleGetMaintenances = async () => {
    setLoading(true);

    try {
      const responseData = await getMaintenancesKanban({
        userId: userData.id,
        filter,
      });

      setKanban(responseData.kanban);
      setMaintenanceCategoriesForSelect(responseData.maintenanceCategoriesForSelect);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  // # endregion

  const handleGetBuildingsBySyndicId = async () => {
    try {
      const responseData = await getBuildingsBySyndicId(syndicNanoId);

      setBuildingsBySyndic(responseData.buildings);
    } catch (error) {
      catchHandler(error);
    }
  };

  useEffect(() => {
    handleGetMaintenances();
    handleGetBuildingsBySyndicId();
  }, [userData, refresh]);

  return (
    <>
      {modalCreateOccasionalMaintenance && (
        <ModalCreateOccasionalMaintenance
          handleModalCreateOccasionalMaintenance={setModalCreateOccasionalMaintenance}
          handleMaintenanceHistoryIdChange={handleMaintenanceHistoryIdChange}
          handleModalMaintenanceDetails={setModalMaintenanceDetails}
          handleModalSendMaintenanceReport={setModalMaintenanceSendReport}
          handleGetBackgroundData={handleGetMaintenances}
        />
      )}

      {/* {modalMaintenanceSendReport && (
        <ModalSendMaintenanceReport
          modalAdditionalInformations={{
            ...modalAdditionalInformations,
            id: maintenanceHistoryId || modalAdditionalInformations.id,
          }}
          setModal={setModalSendReportOpen}
          filter={filter}
          setBuildingName={setBuildingName}
          setFilterOptions={setFilterOptions}
          setKanban={setKanban}
          setLoading={setLoading}
          syndicNanoId={syndicNanoId}
        />
      )} */}

      {/*
      {modalMaintenanceDetails && (
        <ModalMaintenanceDetails
          modalAdditionalInformations={{
            ...modalAdditionalInformations,
            id: maintenanceHistoryId || modalAdditionalInformations.id,
          }}
          setModal={setModalMaintenanceDetailsOpen}
        />
      )} */}

      {/* {modalCreateOccasionalMaintenance && (
        <ModalCreateOccasionalMaintenance
          syndicNanoId={syndicNanoId}
          handleGetBackgroundData={handleGetSyndicKanban}
          handleMaintenanceHistoryIdChange={handleMaintenanceHistoryIdChange}
          handleModalCreateOccasionalMaintenance={handleModalCreateOccasionalMaintenance}
          handleModalMaintenanceDetails={handleModalMaintenanceDetails}
          handleModalSendMaintenanceReport={handleModalSendMaintenanceReport}
        />
      )} */}

      {modalChecklistCreate && (
        <ModalChecklistCreate
          buildingId={buildingNanoId}
          handleModals={handleModals}
          handleRefresh={handleRefresh}
        />
      )}

      {modalChecklistDetails && checklistId && (
        <ModalChecklistDetails
          buildingId={buildingNanoId}
          checklistId={checklistId}
          handleModals={handleModals}
        />
      )}

      <Style.Container>
        <Style.Header>
          <Style.HeaderWrapper>
            <h2>Filtros</h2>

            <IconButton
              icon={icon.filter}
              color={theme.color.gray5}
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            />
          </Style.HeaderWrapper>

          <Style.IconsContainer>
            <IconButton
              disabled={loading}
              label="Checklist"
              icon={icon.plus}
              onClick={() => {
                handleModals('modalChecklistCreate', true);
              }}
            />

            <IconButton
              icon={icon.plus}
              label="Manutenção avulsa"
              onClick={() => setModalCreateOccasionalMaintenance(true)}
            />
          </Style.IconsContainer>
        </Style.Header>

        {showFilter && (
          <Style.FiltersContainer>
            <Formik initialValues={filter} onSubmit={async () => handleGetMaintenances()}>
              {() => (
                <Form>
                  <Style.FilterWrapper>
                    <FormikSelect
                      id="building-select"
                      label="Edificação"
                      selectPlaceholderValue={' '}
                      value=""
                      onChange={(e) => {
                        handleFilterChange('buildings', e.target.value);

                        if (e.target.value === 'all') {
                          setFilter((prevState) => ({
                            ...prevState,
                            buildings: [],
                          }));
                        }
                      }}
                    >
                      <option value="" disabled hidden>
                        Selecione
                      </option>

                      <option value="all" disabled={filter.buildings.length === 0}>
                        Todas
                      </option>

                      {buildingsForSelect.map((building) => (
                        <option
                          value={building.id}
                          key={building.id}
                          disabled={filter.buildings.some((b) => b === building.id)}
                        >
                          {building.name}
                        </option>
                      ))}
                    </FormikSelect>

                    {/* <FormikSelect
                      id="users-select"
                      label="Usuário"
                      selectPlaceholderValue=" "
                      value=""
                      onChange={(e) => {
                        handleFilterChange('users', e.target.value);

                        if (e.target.value === 'all') {
                          setFilter((prevState) => ({
                            ...prevState,
                            users: [],
                          }));
                        }
                      }}
                    >
                      <option value="" disabled hidden>
                        Selecione
                      </option>

                      <option value="all" disabled={filter.users.length === 0}>
                        Todos
                      </option>

                      {usersForSelect.map((user) => (
                        <option
                          value={user.id}
                          key={user.id}
                          disabled={filter.users.some((u) => u === user.id)}
                        >
                          {user.name}
                        </option>
                      ))}
                    </FormikSelect> */}

                    <FormikSelect
                      id="status-select"
                      label="Status"
                      selectPlaceholderValue={' '}
                      value=""
                      onChange={(e) => {
                        handleFilterChange('status', e.target.value);

                        if (e.target.value === 'all') {
                          setFilter((prevState) => ({
                            ...prevState,
                            status: [],
                          }));
                        }
                      }}
                    >
                      <option value="" disabled hidden>
                        Selecione
                      </option>

                      <option value="all" disabled={filter.status.length === 0}>
                        Todas
                      </option>

                      {maintenanceStatusForSelect.map((maintenanceStatus) => (
                        <option
                          key={maintenanceStatus.id}
                          value={maintenanceStatus.name}
                          disabled={filter.status.some((s) => s === maintenanceStatus.id)}
                        >
                          {capitalizeFirstLetter(maintenanceStatus.singularLabel ?? '')}
                        </option>
                      ))}
                    </FormikSelect>

                    <FormikSelect
                      id="category-select"
                      label="Categoria"
                      selectPlaceholderValue={' '}
                      value=""
                      onChange={(e) => {
                        handleFilterChange('categories', e.target.value);

                        if (e.target.value === 'all') {
                          setFilter((prevState) => ({
                            ...prevState,
                            status: [],
                          }));
                        }
                      }}
                    >
                      <option value="" disabled hidden>
                        Selecione
                      </option>

                      <option value="all" disabled={filter.categories.length === 0}>
                        Todas
                      </option>

                      {maintenanceCategoriesForSelect.map((maintenanceCategory) => (
                        <option
                          key={maintenanceCategory.id}
                          value={maintenanceCategory.id}
                          disabled={filter.categories.some((c) => c === maintenanceCategory.id)}
                        >
                          {maintenanceCategory.name}
                        </option>
                      ))}
                    </FormikSelect>

                    <Select
                      disabled={loading || !showPriority}
                      selectPlaceholderValue={' '}
                      label="Prioridade"
                      value={filter.priorityName}
                      onChange={(e) => {
                        setFilter((prevState) => {
                          const newState = { ...prevState };
                          newState.priorityName = e.target.value;
                          return newState;
                        });
                      }}
                    >
                      <option value="">Todas</option>
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </Select>

                    <FormikInput
                      label="Data inicial"
                      typeDatePlaceholderValue={filter.startDate}
                      name="startDate"
                      type="date"
                      value={filter.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    />

                    <FormikInput
                      label="Data final"
                      typeDatePlaceholderValue={filter.endDate}
                      name="endDate"
                      type="date"
                      value={filter.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    />
                  </Style.FilterWrapper>

                  <Style.FilterWrapperFooter>
                    <Style.FilterButtonWrapper>
                      <Button
                        type="button"
                        label="Limpar filtros"
                        borderless
                        disable={loading}
                        onClick={() => handleClearFilter()}
                      />

                      <Button type="submit" label="Filtrar" disable={loading} />
                    </Style.FilterButtonWrapper>

                    <Style.FilterTags>
                      {filter.buildings?.length === 0 ? (
                        <ListTag padding="4px 12px" fontWeight={500} label="Todas as edificações" />
                      ) : (
                        filter.buildings?.map((building) => (
                          <ListTag
                            key={building}
                            label={buildingsForSelect.find((b) => b.id === building)?.name || ''}
                            padding="4px 12px"
                            fontWeight={500}
                            onClick={() => {
                              setFilter((prevState) => ({
                                ...prevState,
                                buildings: prevState.buildings?.filter((b) => b !== building),
                              }));
                            }}
                          />
                        ))
                      )}

                      {/* {filter.users?.length === 0 ? (
                        <ListTag padding="4px 12px" fontWeight={500} label="Todos os usuários" />
                      ) : (
                        filter.users?.map((user) => (
                          <ListTag
                            key={user}
                            label={usersForSelect.find((u) => u.id === user)?.name || ''}
                            padding="4px 12px"
                            fontWeight={500}
                            onClick={() => {
                              setFilter((prevState) => ({
                                ...prevState,
                                users: prevState.users?.filter((u) => u !== user),
                              }));
                            }}
                          />
                        ))
                      )} */}

                      {filter.status?.length === 0 ? (
                        <ListTag padding="4px 12px" fontWeight={500} label="Todos os status" />
                      ) : (
                        filter.status?.map((status) => (
                          <ListTag
                            key={status}
                            label={capitalizeFirstLetter(
                              maintenanceStatusForSelect.find((ms) => ms.name === status)
                                ?.singularLabel || '',
                            )}
                            padding="4px 12px"
                            fontWeight={500}
                            onClick={() => {
                              setFilter((prevState) => ({
                                ...prevState,
                                status: prevState.status?.filter((s) => s !== status),
                              }));
                            }}
                          />
                        ))
                      )}

                      {filter.categories?.length === 0 ? (
                        <ListTag padding="4px 12px" fontWeight={500} label="Todos as categorias" />
                      ) : (
                        filter.categories?.map((category) => (
                          <ListTag
                            key={category}
                            label={
                              maintenanceCategoriesForSelect.find((mc) => mc.id === category)
                                ?.name || ''
                            }
                            padding="4px 12px"
                            fontWeight={500}
                            onClick={() => {
                              setFilter((prevState) => ({
                                ...prevState,
                                status: prevState.categories?.filter((c) => c !== category),
                              }));
                            }}
                          />
                        ))
                      )}
                    </Style.FilterTags>
                  </Style.FilterWrapperFooter>
                </Form>
              )}
            </Formik>
          </Style.FiltersContainer>
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

              {loading && (
                <>
                  {(i === 1 || i === 2 || i === 3) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}

                  {(i === 0 || i === 1 || i === 2 || i === 3) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}

                  {(i === 0 || i === 2 || i === 3) && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}

                  {i === 3 && (
                    <Style.MaintenanceWrapper>
                      <Skeleton />
                    </Style.MaintenanceWrapper>
                  )}
                </>
              )}

              {!loading &&
                card.maintenances.length > 0 &&
                card.maintenances.map((maintenance) => {
                  const isPending = maintenance.status === 'pending';
                  const isFuture =
                    new Date(maintenance.date) > new Date(new Date().setHours(0, 0, 0, 0));

                  // se for avulsa, pode reportar qlqer vencida
                  const showExpiredOccasional =
                    maintenance.type === 'occasional' && maintenance.status === 'expired';

                  const isExpired = maintenance.status === 'expired';
                  const isOldExpired =
                    maintenance.status === 'expired' && maintenance.cantReportExpired;

                  const { inProgress } = maintenance;

                  return (
                    ((((showFutureMaintenances && isPending && isFuture) ||
                      (isPending && !isFuture) ||
                      !isPending) &&
                      ((showOldExpireds && isExpired && isOldExpired) ||
                        (isExpired && !isOldExpired) ||
                        !isExpired)) ||
                      showExpiredOccasional ||
                      inProgress) && (
                      <Style.MaintenanceWrapper key={maintenance.id}>
                        <Style.MaintenanceInfo
                          status={maintenance.status}
                          onClick={() => {
                            if (maintenance.type === 'checklist') {
                              setChecklistId(maintenance.id);
                              handleModals('modalChecklistDetails', true);
                            } else if (
                              maintenance.status === 'pending' ||
                              maintenance.status === 'expired'
                            ) {
                              setModalAdditionalInformations({
                                id: maintenance.id,
                                expectedNotificationDate: '',
                                expectedDueDate: '',
                                isFuture: false,
                              });
                              handleMaintenanceHistoryIdChange(maintenance.id);
                              handleModals('modalSendMaintenanceReport', true);
                            } else {
                              setModalAdditionalInformations({
                                id: maintenance.id,
                                expectedNotificationDate: '',
                                expectedDueDate: '',
                                isFuture: false,
                              });
                              handleMaintenanceHistoryIdChange(maintenance.id);
                              handleModals('modalMaintenanceDetails', true);
                            }
                          }}
                        >
                          <h5>{maintenance?.buildingName}</h5>

                          <h6>
                            <span>
                              <Style.EventsWrapper>
                                <EventTag status={maintenance.type} />

                                {maintenance.status === 'pending' &&
                                  new Date(maintenance.date) >
                                    new Date(new Date().setHours(0, 0, 0, 0)) && (
                                    <FutureMaintenanceTag />
                                  )}

                                {maintenance.status === 'overdue' && <EventTag status="overdue" />}
                              </Style.EventsWrapper>

                              <EventTag
                                label={maintenance.priorityLabel}
                                color={theme.color.gray4}
                                bgColor="transparent"
                                fontWeight="bold"
                              />
                            </span>

                            {maintenance.element || maintenance.name}
                          </h6>
                          <p className="p2">
                            {maintenance.activity || maintenance.checklistProgress}
                          </p>

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

              {!loading &&
                (card.maintenances.length === 0 ||
                  (!showFutureMaintenances &&
                    card.maintenances.every(
                      (maintenance) =>
                        maintenance.status === 'pending' &&
                        !maintenance.inProgress &&
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
