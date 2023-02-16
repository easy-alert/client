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

export interface IBuilding {
  name: string;
  Banners: {
    bannerName: string;
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
    name: string;
    label: string;
  }[];
  years: string[];
}

export interface IFilter {
  months: string;
  status: string;
  years: string;
}

export interface IRequestMaintenancesPlan {
  buildingId: string;
  setMaintenancesPlan: React.Dispatch<React.SetStateAction<IMaintenancesPlan[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  setBuilding: React.Dispatch<React.SetStateAction<IBuilding>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  filter: IFilter;
}
