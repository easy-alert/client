import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  buildingId,
  setLoading,
  setBuilding,
  setFilterOptions,
}: IRequestMaintenancesPlan) => {
  await Api.get(`/building/${buildingId}`)
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
    });
};
