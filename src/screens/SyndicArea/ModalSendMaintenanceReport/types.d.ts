import { AnnexesAndImages } from '../../types';
import { IFilterOptions, IKanban } from '../types';
import { IModalAdditionalInformations } from '../../MaintenancesPlan/types';

export interface IModalSendMaintenanceReport {
  setModal: (setModal: boolean) => void;
  modalAdditionalInformations: IModalAdditionalInformations;
  syndicNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
}

export interface IMaintenanceReport {
  cost: string;
  observation: string;
}

export interface IRequestSendReport {
  origin?: string;
  maintenanceReport: IMaintenanceReport;
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
  files: AnnexesAndImages[];
  images: AnnexesAndImages[];
  syndicNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
}

export interface IRequestToggleInProgress {
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
  syndicNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
  inProgressChange: boolean;
}

export interface IRequestReportProgress {
  maintenanceHistoryId: string;
  setFiles: React.Dispatch<React.SetStateAction<AnnexesAndImages[]>>;
  setImages: React.Dispatch<React.SetStateAction<AnnexesAndImages[]>>;
  setMaintenanceReport: React.Dispatch<React.SetStateAction<IMaintenanceReport>>;
}

export interface IRequestSaveReportProgress {
  maintenanceReport: IMaintenanceReport;
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
  files: AnnexesAndImages[];
  images: AnnexesAndImages[];
  syndicNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
}
