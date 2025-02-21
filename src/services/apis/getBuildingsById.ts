import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IGetBuildingById {
  buildingId: string;
}

export async function getBuildingsById({ buildingId }: IGetBuildingById) {
  const uri = `/building/id/${buildingId}`;

  try {
    const response = await Api.get(uri);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response.data.ServerMessage);

    return { building: {} };
  }
}
