import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestSyndicList } from './types';

export const requestSyndicList = async ({
  setLoading,
  buildingNanoId,
  setSyndics,
}: IRequestSyndicList) => {
  await Api.get(`/syndics/${buildingNanoId}`)
    .then((res) => {
      setSyndics(res.data);
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        window.open('https://easyalert.com.br/', '_self');
      } else {
        catchHandler(err);
      }
    })
    .finally(() => {
      setLoading(false);
    });
};
