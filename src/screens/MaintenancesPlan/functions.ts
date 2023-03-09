import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IMaintenancesPlan, IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  setFilteredMaintenancesPlan,
  buildingNanoId,
  setLoading,
  setOnQuery,
  setBuilding,
  setFilterOptions,
  year,
  currentYear,
  month,
  status,
}: IRequestMaintenancesPlan) => {
  setOnQuery(true);

  await Api.get(
    `/building/${buildingNanoId}?year=${String(currentYear) < year ? String(currentYear) : year}`,
  )
    .then((res) => {
      let filtered: IMaintenancesPlan[] = [];

      res.data.months.forEach((maintenance: IMaintenancesPlan) => {
        filtered.push({
          ...maintenance,
          dates: maintenance.dates.filter((date) => date.dateInfos.year === Number(year)),
        });
      });

      if (month !== '') {
        filtered = filtered.filter((maintenance) => maintenance.monthNumber === month);
      }

      const filteredStatus: IMaintenancesPlan[] = [];

      if (status !== '') {
        filtered.forEach((maintenance) => {
          filteredStatus.push({
            ...maintenance,
            dates: maintenance.dates.filter((date) => date.status === status),
          });
        });
      }

      setFilteredMaintenancesPlan(filteredStatus.length ? filteredStatus : filtered);
      setMaintenancesPlan(res.data.months);
      setFilterOptions(res.data.Filters);
      setBuilding(res.data.building);
      setLoading(false);
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        window.open('https://easyalert.com.br/', '_self');
      } else {
        catchHandler(err);
        setLoading(false);
      }
    })
    .finally(() => {
      setOnQuery(false);
    });
};
