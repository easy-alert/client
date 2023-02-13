export interface DateInfos {
  dayNumber: number;
  name: string;
  smName: string;
}

export interface Date {
  element: string;
  activity: string;
  status: 'expired' | 'pending' | 'completed' | 'overdue';
  dateInfos: DateInfos;
}

export interface IMaintenancesPlan {
  name: string;
  dates: Date[];
}

export interface IRequestMaintenancesPlan {
  syndicId: string;
  buildingId: string;
  setMaintenancesPlan: React.Dispatch<React.SetStateAction<IMaintenancesPlan[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
