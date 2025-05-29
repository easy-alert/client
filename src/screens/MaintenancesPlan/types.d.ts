import type { ITicketStatus } from '@customTypes/ITicket';

export interface DateInfos {
  dayNumber: number;
  name: string;
  smName: string;
  year: number;
}

export interface Date {
  element: string;
  activity: string;
  status: 'expired' | 'pending' | 'completed' | 'overdue' | string;
  statusLabel?: string;
  statusColor?: string;
  statusBgColor?: string;
  dateInfos: DateInfos;
  isFuture: boolean;
  id: string;
  expectedNotificationDate: string;
  expectedDueDate: string;
  type: string;
  inProgress: boolean;
  categoryId?: string;
}

export interface IMaintenancesPlan {
  name: string;
  monthNumber: string;
  dates: Date[];
}

export interface IBuilding {
  name: string;
  Banners: {
    id: string;
    originalName: string;
    redirectUrl: string;
    type: 'Web' | 'Mobile';
    url: string;
  }[];
}

export interface IFilterOptions {
  months: {
    monthNumber: string;
    label: string;
  }[];
  status: {
    name: 'expired' | 'pending' | 'completed' | 'overdue' | ITicketStatus | string;
    label: string;
  }[];
  years: string[];
}

export interface IFilter {
  years: string;
  months: string;
  category: string;
  status: 'expired' | 'pending' | 'completed' | 'overdue' | string;
}

export interface IModalAdditionalInformations {
  id: string;
  isFuture: boolean;
  expectedNotificationDate: string;
  expectedDueDate: string;
}

export interface IRequestMaintenancesPlan {
  buildingId: string;
  setMaintenancesPlan: React.Dispatch<React.SetStateAction<IMaintenancesPlan[]>>;
  setFilteredMaintenancesPlan: React.Dispatch<React.SetStateAction<IMaintenancesPlan[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  setBuilding: React.Dispatch<React.SetStateAction<IBuilding>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  year: string;
  month: string;
  status: 'expired' | 'pending' | 'completed' | 'overdue' | string;
  currentYear: number;
}
