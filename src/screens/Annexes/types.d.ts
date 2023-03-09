export interface IAnnex {
  name: string;
  originalName: string;
  url: string;
}

export interface IInformations {
  Annexes: IAnnex[];
  name: string;
}

export interface IRequestAnnexInformations {
  buildingNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<IInformations>>;
}
