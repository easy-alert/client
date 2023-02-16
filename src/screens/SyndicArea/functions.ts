import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestSyndicKanban } from './types';

export const requestSyndicKanban = async ({
  setLoading,
  syndicId,
  setFilterOptions,
  setKanban,
}: IRequestSyndicKanban) => {
  await Api.get(`/syndic/${syndicId}`)
    .then((res) => {
      setKanban(res.data.kanban);
      setFilterOptions(res.data.Filters);
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
