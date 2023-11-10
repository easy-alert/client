import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestCompanyLogo } from './types';

export const requestCompanyLogo = async ({
  setCompanyLogo,
  buildingNanoId,
}: IRequestCompanyLogo) => {
  await Api.get(`/building/logo/${buildingNanoId}`)
    .then((res) => {
      setCompanyLogo(res.data);
    })
    .catch((err) => {
      catchHandler(err);
    });
};
