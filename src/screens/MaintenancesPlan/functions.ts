import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IMaintenancesPlan, IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  setFilteredMaintenancesPlan,
  buildingId,
  setLoading,
  setOnQuery,
  setBuilding,
  setFilterOptions,
  year,
  currentYear,
  month,
}: IRequestMaintenancesPlan) => {
  setOnQuery(true);

  await Api.get(
    `/building/${buildingId}?year=${String(currentYear) < year ? String(currentYear) : year}`,
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

      setFilteredMaintenancesPlan(filtered);
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
