import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
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
