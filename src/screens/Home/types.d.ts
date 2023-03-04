export interface IInformations {
  annexes: {
    name: string;
    originalName: string;
    url: string;
  }[];
  mainContact: {
    name: string;
    email: string;
    role: string;
    contactNumber: string;
  };
  buildingName: string;
}

export interface IRequestMainContactInformations {
  buildingId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<IInformations>>;
}
