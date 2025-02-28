import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestCompanyLogo } from './types';

export const requestCompanyLogo = async ({ setCompanyLogo, buildingId }: IRequestCompanyLogo) => {
  await Api.get(`/building/logo/${buildingId}`)
    .then((res) => {
      setCompanyLogo(res.data);
    })
    .catch((err) => {
      catchHandler(err);
    });
};
