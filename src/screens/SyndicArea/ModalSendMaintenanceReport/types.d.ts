import { AnnexesAndImages } from '../../types';

export interface IModalSendMaintenanceReport {
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
}

export interface IMaintenanceReport {
  cost: string;
  observation: string;
}

export interface IRequestSendReport {
  maintenanceReport: IMaintenanceReport;
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
  files: AnnexesAndImages[];
  images: AnnexesAndImages[];
  setOnQuery: (setOnQuery: boolean) => void;
}
