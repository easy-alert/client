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
}: IRequestMaintenancesPlan) => {
  setOnQuery(true);

  await Api.get(`/building/${buildingId}?year=${year}`)
    .then((res) => {
      const filtered: IMaintenancesPlan[] = [];

      res.data.months.forEach((maintenance: IMaintenancesPlan) => {
        filtered.push({
          ...maintenance,
          dates: maintenance.dates.filter(
            (date) => date.dateInfos.year === new Date().getFullYear(),
          ),
        });
      });

      setFilteredMaintenancesPlan(filtered);
      setFilterOptions(res.data.Filters);
      setMaintenancesPlan(res.data.months);
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
