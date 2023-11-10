import * as yup from 'yup';
import { IRequestCreateFolder } from './types';
import { Api } from '../../../services/api';
import { catchHandler } from '../../../utils/functions';

export const schemaCreateFolder = yup
  .object({
    name: yup.string().required('Campo obrigatório.'),
  })
  .required();

export const requestCreateFolder = async ({
  setModal,
  setOnQuery,
  name,
  buildingId,
  setBuilding,
  parentId,
}: IRequestCreateFolder) => {
  setOnQuery(true);

  await Api.post('/buildings/folders/create', {
    name,
    buildingId,
    parentId,
  })
    .then(({ data }) => {
      setModal(false);
      setBuilding((prevState) => {
        if (prevState) {
          const newState = { ...prevState };

          if (newState.Folders) {
            newState.Folders.Folders.unshift(data);
          }

          return newState;
        }
        return undefined;
      });
    })
    .catch((err) => {
      catchHandler(err);
    })
    .finally(() => {
      setOnQuery(false);
    });
};
