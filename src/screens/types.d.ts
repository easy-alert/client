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

export interface MaintenancesStatus {
  name: 'expired' | 'pending' | 'completed' | 'overdue';
}

export interface Building {
  name: string;
}

export interface Category {
  name: string;
}

export interface Maintenance {
  Category: Category;
  element: string;
  activity: string;
  responsible: string;
}

export interface IMaintenance {
  id: string;
  dueDate: string;
  MaintenanceReport: MaintenanceReport[];
  MaintenancesStatus: MaintenancesStatus;
  Building: Building;
  Maintenance: Maintenance;
}
export interface IRequestMaintenanceDetails {
  maintenanceHistoryId: string;
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMaintenance: React.Dispatch<React.SetStateAction<IMaintenance>>;
}
