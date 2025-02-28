import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestHomeInformations } from './types';

export const requestBuildingAccess = async (buildingNanoId: string) => {
  await Api.post(`/building/create-access-history`, {
    buildingNanoId,
  }).catch((err) => {
    if (err.response && err.response.status === 404) {
      window.open('https://easyalert.com.br/', '_self');
    } else {
      catchHandler(err);
    }
  });
};
