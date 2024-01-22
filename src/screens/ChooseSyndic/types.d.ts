export interface ISyndic {
  nanoId: string;
  name: string;
}

export interface IRequestSyndicList {
  setLoading: (setLoading: boolean) => void;
  setSyndics: (setSyndics: ISyndic[]) => void;
  buildingNanoId: string;
}
