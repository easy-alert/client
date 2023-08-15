import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IRequestAnnexInformations, IRequestFolderDetails } from './types';

export const requestAnnexInformations = async ({
  buildingNanoId,
  setLoading,
  setInformations,
  setBuildingName,
  setRootFolder,
}: IRequestAnnexInformations) => {
  await Api.get(`/building/annex/${buildingNanoId}`)
    .then((res) => {
      setBuildingName(res.data.name);
      setInformations(res.data.Folders);
      setRootFolder(res.data.Folders);
      setLoading(false);
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        window.open('https://easyalert.com.br/', '_self');
      } else {
        catchHandler(err);
        setLoading(false);
      }
    });
};

export const requestFolderDetails = async ({
  folderId,
  setInformations,
  setBreadcrumb,
  rootFolder,
}: IRequestFolderDetails) => {
  await Api.get(`/building/folders/list/${folderId}`)
    .then(({ data }) => {
      const breadcrumb = [
        {
          id: data?.Parent?.id || null,
          name: data?.Parent?.name || null,
        },
        {
          id: data.id,
          name: data.name,
        },
      ].filter((e) => e.id);

      if (breadcrumb[0].id !== rootFolder.id) {
        breadcrumb.unshift({
          id: rootFolder.id,
          name: rootFolder.name,
        });
      }

      setBreadcrumb(breadcrumb);

      setInformations((prevState) => {
        if (prevState) {
          let newState = { ...prevState };

          newState = data;

          return newState;
        }
        return undefined;
      });
    })
    .catch((err) => {
      catchHandler(err);
    });
};
