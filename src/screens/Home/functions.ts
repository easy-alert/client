import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestHomeInformations } from './types';

export const requestHomeInformations = async ({
  buildingNanoId,
  setLoading,
  setInformations,
}: IRequestHomeInformations) => {
  await Api.get(`/building/home/${buildingNanoId}`)
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
