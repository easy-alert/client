import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IGetBuildingDocuments {
  buildingNanoId: string;
}

export const getBuildingDocuments = async ({ buildingNanoId }: IGetBuildingDocuments) => {
  const uri = `/building/annex/${buildingNanoId}`;

  try {
    const response = await Api.get(uri);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return null;
  }
};
