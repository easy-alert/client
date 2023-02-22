import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestSyndicKanban } from './types';

export const requestSyndicKanban = async ({
  setLoading,
  syndicId,
  setFilterOptions,
  setKanban,
  setOnQuery,
  filter,
  setBuildingName,
}: IRequestSyndicKanban) => {
  setOnQuery(true);

  await Api.get(
    `/syndic/${syndicId}?year=${filter.years}&month=${filter.months}&status=${filter.status}`,
  )
    .then((res) => {
      setKanban(res.data.kanban);
      setBuildingName(res.data.buildingName);
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
    })
    .finally(() => {
      setOnQuery(false);
    });
};
