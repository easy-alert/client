import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMainContactInformations } from './types';

export const requestMainContactInformations = async ({
  buildingId,
  setLoading,
  setInformations,
}: IRequestMainContactInformations) => {
  await Api.get(`/building/informations/${buildingId}`)
    .then((res) => {
      setInformations(res.data);
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
