export interface IMaintenanceReportData {
  id: string;
  activity: string;
  buildingName: string;
  categoryName: string;
  cost: number | null;
  element: string;
  source: string;
  maintenanceHistoryId: string;
  notificationDate: string;
  resolutionDate: string | null;
  dueDate: string;
  responsible: string | null;
  status: 'completed' | 'expired' | 'pending' | 'overdue';
  type: 'common' | 'occasional' | null;
  inProgress: boolean;
  maintenanceObservation: string | null;
  reportObservation: string | null;
  expectedDueDate?: string;
  expectedNotificationDate?: string;
  isFuture?: boolean;

  images: {
    url: string;
  }[];

  annexes: {
    url: string;
    name: string;
  }[];
}
