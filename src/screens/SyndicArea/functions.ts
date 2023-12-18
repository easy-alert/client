import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestSyndicKanban } from './types';

export const requestSyndicKanban = async ({
  setLoading,
  syndicNanoId,
  setFilterOptions,
  setKanban,
  setOnQuery,
  filter,
  setBuildingName,
}: IRequestSyndicKanban) => {
  setOnQuery(true);

  await Api.get(
    `/syndic/${syndicNanoId}?year=${filter.years}&month=${filter.months}&status=${filter.status}&categoryId=${filter.categoryId}`,
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
