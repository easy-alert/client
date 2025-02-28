import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IRequestFolderDetails {
  folderId: string;
  rootFolder: any;
}

export const getBuildingFolderDetails = async ({ folderId, rootFolder }: IRequestFolderDetails) => {
  const uri = `/building/folders/list/${folderId}`;

  try {
    const response = await Api.get(uri);

    const breadcrumb = [
      {
        id: response?.data?.Parent?.id || null,
        name: response?.data?.Parent?.name || null,
      },
      {
        id: response?.data.id,
        name: response?.data.name,
      },
    ].filter((e) => e.id);

    if (breadcrumb[0].id !== rootFolder.id) {
      breadcrumb.unshift({
        id: rootFolder.id,
        name: rootFolder.name,
      });
    }

    return {
      breadcrumb,
      informations: response.data,
    };
  } catch (error: any) {
    handleToastify(error.response);

    return null;
  }
};
