export interface AnnexesAndImages {
  name: string;
  originalName: string;
  url: string;
}

export interface MaintenanceReport {
  id: string;
  cost: number;
  observation: string;
  ReportAnnexes: AnnexesAndImages[];
  ReportImages: AnnexesAndImages[];
}

export interface MaintenanceReportProgress {
  id: string;
  cost: number;
  observation: string;
  ReportAnnexesProgress: AnnexesAndImages[];
  ReportImagesProgress: AnnexesAndImages[];
}

export interface MaintenancesStatus {
  name: 'expired' | 'pending' | 'completed' | 'overdue';
}

export interface Building {
  name: string;
  guestCanCompleteMaintenance: boolean;
}

export interface Category {
  name: string;
}

export interface Maintenance {
  Category: Category;
  activity: string;
  element: string;
  observation: string;
  responsible: string;
  source: string;

  frequency: number;
  FrequencyTimeInterval: {
    pluralLabel: string;
    singularLabel: string;
  };

  MaintenanceType: {
    name: string;
  };

  instructions: { name: string; url: string }[];
}

export interface IMaintenance {
  id: string;
  dueDate: string;
  resolutionDate: string;
  notificationDate: string;
  MaintenanceReport: MaintenanceReport[];
  MaintenanceReportProgress: MaintenanceReportProgress[];
  MaintenancesStatus: MaintenancesStatus;
  Building: Building;
  Maintenance: Maintenance;
  canReport: boolean;
  inProgress: boolean;
  daysInAdvance: number;
}

export interface IRequestMaintenanceDetails {
  maintenanceHistoryId: string;
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMaintenance: React.Dispatch<React.SetStateAction<IMaintenance>>;
}
