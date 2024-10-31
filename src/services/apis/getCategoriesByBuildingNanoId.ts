// SERVICES
import { Api } from '@services/api';

// GLOBAL TYPES
import type { ICategory } from '@customTypes/ICategory';
import type { IResponse } from '@customTypes/IResponse';
import { handleToastify } from '@utils/toastifyResponses';

interface IGetCategoriesByBuildingNanoId {
  buildingNanoId: string;
}

interface IResponseGetCategoriesByBuildingNanoId extends IResponse {
  data: {
    Categories: ICategory[];
  };
}

export const getCategoriesByBuildingNanoId = async ({
  buildingNanoId,
}: IGetCategoriesByBuildingNanoId) => {
  const uri = `/buildings/maintenances/occasional/auxiliarydata/${buildingNanoId}`;

  try {
    const response: IResponseGetCategoriesByBuildingNanoId = await Api.get(uri);

    const { Categories: categories } = response.data;

    return categories;
  } catch (error: any) {
    handleToastify(error.response.data.ServerMessage);

    return [];
  }
};
