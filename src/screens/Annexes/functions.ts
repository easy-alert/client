import { icon } from '../../assets/icons';
import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import { IAnnex, IRequestAnnexInformations } from './types';

export const requestAnnexInformations = async ({
  buildingId,
  setLoading,
  setInformations,
}: IRequestAnnexInformations) => {
  await Api.get(`/building/annex/${buildingId}`)
    .then((res) => {
      setInformations(res.data);
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

export const checkFileType = (file: IAnnex) => {
  if (
    file.originalName.endsWith('png') ||
    file.originalName.endsWith('jpg') ||
    file.originalName.endsWith('jpeg')
  ) {
    return file.url;
  }
  return icon.paper;
};
