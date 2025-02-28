import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IGetBuildingContacts {
  buildingId: string;
}

export const getBuildingContacts = async ({ buildingId }: IGetBuildingContacts) => {
  const uri = `/building/informations/${buildingId}`;

  try {
    const response = await Api.get(uri);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return null;
  }
};
