import type { IMaintenanceReportData } from '@customTypes/IMaintenanceReportData';

export interface ISupplierMaintenanceHistory {
  maintenancesHistory: IMaintenanceReportData[];
  getMaintenanceHistory: () => void;
}
