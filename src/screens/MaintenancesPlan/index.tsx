/* eslint-disable react/no-array-index-key */
// LIBS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePrevious } from 'react-use';
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

  const [filteredMaintenancesPlan, setFilteredMaintenancesPlan] = useState<IMaintenancesPlan[]>([]);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [building, setBuilding] = useState<IBuilding>({ Banners: [], name: '' });

  const [loading, setLoading] = useState<boolean>(true);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [selectedMaintenanceHistoryId, setSelectedMaintenanceHistoryId] = useState<string>('');

  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    months: [],
    status: [],
    years: [],
  });

  const currentYear = new Date().getFullYear();

  const [filter, setFilter] = useState<IFilter>({
    months: '',
    status: '',
    years: String(currentYear),
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

    setFilteredMaintenancesPlan(filtered);
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
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalMaintenanceDetailsOpen && (
        <ModalMaintenanceDetails
          setModal={setModalMaintenanceDetailsOpen}
          maintenanceHistoryId={selectedMaintenanceHistoryId}
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
                    month.dates.map((maintenance, i: number) => (
                      <Style.DayWrapper
                        key={maintenance.activity + i}
                        onClick={() => {
                          setSelectedMaintenanceHistoryId(maintenance.id);
                          setModalMaintenanceDetailsOpen(true);
                        }}
                      >
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
