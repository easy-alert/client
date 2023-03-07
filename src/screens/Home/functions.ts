import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestHomeInformations } from './types';

export const requestHomeInformations = async ({
  buildingId,
  setLoading,
  setInformations,
}: IRequestHomeInformations) => {
  await Api.get(`/building/home/${buildingId}`)
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
