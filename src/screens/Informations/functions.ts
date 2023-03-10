import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestMainContactInformations } from './types';

export const requestMainContactInformations = async ({
  buildingNanoId,
  setLoading,
  setInformations,
}: IRequestMainContactInformations) => {
  await Api.get(`/building/informations/${buildingNanoId}`)
    .then((res) => {
      setInformations(res.data);
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
