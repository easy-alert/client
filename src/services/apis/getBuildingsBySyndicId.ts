import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IResponse } from '@customTypes/IResponse';

interface IBuildingsBySyndic {
  buildingName: string;
  syndicNanoId: string;
  syndicName: string;
  buildingNanoId: string;
  companyName: string;
  label: string;
}

interface IGetBuildingsBySyndicIdResponse extends IResponse {
  data: {
    buildings: IBuildingsBySyndic[];
  };
}

export async function getBuildingsBySyndicId(syndicId: string) {
  const uri = `/find-buildings-by-syndic-nano-id/${syndicId}`;

  try {
    const response: IGetBuildingsBySyndicIdResponse = await Api.get(uri);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response.data.ServerMessage);

    return { buildings: [] };
  }
}
