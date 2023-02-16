// LIBS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { icon } from '../../assets/icons';

// COMPONENTS
import { Button } from '../../components/Buttons/Button';
import { IconButton } from '../../components/Buttons/IconButton';
import { EventTag } from '../../components/EventTag';
import { Select } from '../../components/Inputs/Select';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { ModalMaintenanceDetails } from './ModalMaintenanceDetails';

// STYLES
import * as Style from './styles';
import { theme } from '../../styles/theme';

// TYPES
import { IBuilding, IFilter, IFilterOptions, IMaintenancesPlan } from './types';

// FUNCTIONS
import { requestMaintenancesPlan } from './functions';
import { capitalizeFirstLetter } from '../../utils/functions';

export const MaintenancesPlan = () => {
  const { buildingId } = useParams() as { buildingId: string };

  const [maintenancesPlan, setMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [building, setBuilding] = useState<IBuilding>({ Banners: [], name: '' });

  const [loading, setLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    months: [],
    status: [],
    years: [],
  });

  const [filter, setFilter] = useState<IFilter>({
    months: '', // arrumar arrumar arrumar
    status: '',
    years: String(new Date().getFullYear()),
  });

  const [modalMaintenanceDetailsOpen, setModalMaintenanceDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    requestMaintenancesPlan({
      buildingId,
      setLoading,
      setMaintenancesPlan,
      setBuilding,
      setFilterOptions,
      filter,
      setOnQuery,
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalMaintenanceDetailsOpen && (
        <ModalMaintenanceDetails
          setModal={setModalMaintenanceDetailsOpen}
          maintenanceHistoryId="706f7543-cd5d-496e-b404-3af46c0ea736"
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
              <h4>Plano de manutenções</h4>
              <IconButton
                icon={icon.filter}
                size="16px"
                label={showFilter ? 'Ocultar filtros' : 'Filtrar'}
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
                  <option value="">Todas</option>
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
                    requestMaintenancesPlan({
                      buildingId,
                      setLoading,
                      setMaintenancesPlan,
                      setBuilding,
                      setFilterOptions,
                      filter,
                      setOnQuery,
                    });
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

            {maintenancesPlan.length > 0 &&
              !onQuery &&
              maintenancesPlan.map((month) => (
                <Style.MonthSection
                  key={month.name}
                  onClick={() => {
                    setModalMaintenanceDetailsOpen(true);
                  }}
                >
                  <h5>{month.name}</h5>
                  {month.dates.length > 0 ? (
                    month.dates.map((maintenance, i: number) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Style.DayWrapper key={maintenance.activity + i}>
                        <Style.DayInfo>
                          <p className="p3">{maintenance.dateInfos.dayNumber}</p>
                          <p className="p3">{maintenance.dateInfos.smName}</p>
                        </Style.DayInfo>
                        <Style.Maintenance status={maintenance.status}>
                          <Style.MaintenanceTags>
                            {maintenance.status === 'overdue' && <EventTag status="completed" />}
                            <EventTag status={maintenance.status} />
                          </Style.MaintenanceTags>

                          <h6>{maintenance.activity}</h6>
                          <p className="p2">{maintenance.element}</p>
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

            {maintenancesPlan.length === 0 && !onQuery && (
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
