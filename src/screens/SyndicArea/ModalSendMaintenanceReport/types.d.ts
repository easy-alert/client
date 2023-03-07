import { AnnexesAndImages } from '../../types';
import { IFilterOptions, IKanban } from '../types';
import { IModalAdditionalInformations } from '../../MaintenancesPlan/types';

export interface IModalSendMaintenanceReport {
  setModal: (setModal: boolean) => void;
  modalAdditionalInformations: IModalAdditionalInformations;
  syndicId: string;
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
  maintenanceReport: IMaintenanceReport;
  setModal: (setModal: boolean) => void;
  maintenanceHistoryId: string;
  files: AnnexesAndImages[];
  images: AnnexesAndImages[];
  syndicId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
}
