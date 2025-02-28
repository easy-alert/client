import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IRequestHomeInformations {
  buildingId: string;
}
export const getHomeInformation = async ({ buildingId }: IRequestHomeInformations) => {
  const uri = `/building/home/${buildingId}`;

  try {
    const response = await Api.get(uri);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      window.open('https://easyalert.com.br/', '_self');
    } else {
      handleToastify(error.response);
    }

    return null;
  }
};
