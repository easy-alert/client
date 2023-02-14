import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  buildingId,
  setLoading,
  setBuilding,
}: IRequestMaintenancesPlan) => {
  await Api.get(`/building/${buildingId}`)
    .then((res) => {
      setMaintenancesPlan(res.data.months);
      setBuilding(res.data.building);
      setLoading(false);
    })
    .catch((err) => {
      if (err.response.status === 404) {
        window.open('https://easyalert.com.br/', '_self');
      } else {
        catchHandler(err);
        setLoading(false);
      }
    });
};
