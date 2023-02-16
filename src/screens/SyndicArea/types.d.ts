export interface IKanban {
  buildingName: string;
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
  syndicId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOptions: React.Dispatch<React.SetStateAction<IFilterOptions>>;
  setOnQuery: React.Dispatch<React.SetStateAction<boolean>>;
  filter: IFilter;
  setKanban: React.Dispatch<React.SetStateAction<IKanban[]>>;
}
