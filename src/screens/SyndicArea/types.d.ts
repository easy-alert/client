export interface MaintenanceKanban {
  id: string;
  element: string;
  activity: string;
  status: 'expired' | 'pending' | 'completed' | 'overdue';
  date: Date;
  label: string;
}

export interface IKanban {
  status: string;
  maintenances: MaintenanceKanban[];
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

export interface IRequestSyndicKanban {
  syndicNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
  setBuildingName: React.Dispatch<React.SetStateAction<string>>;
}
