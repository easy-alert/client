import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMaintenancesPlan } from './types';

export const requestMaintenancesPlan = async ({
  setMaintenancesPlan,
  syndicId,
  buildingId,
  setLoading,
}: IRequestMaintenancesPlan) => {
  await Api.get(`/building/${buildingId}/syndic/${syndicId}`)
    .then((res) => {
      setMaintenancesPlan(res.data.months);
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
