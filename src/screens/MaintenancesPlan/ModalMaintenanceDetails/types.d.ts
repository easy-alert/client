import { IModalAdditionalInformations } from '../types';

export interface IModalMaintenanceDetails {
  setModal: (setModal: boolean) => void;
  modalAdditionalInformations: IModalAdditionalInformations;
}
