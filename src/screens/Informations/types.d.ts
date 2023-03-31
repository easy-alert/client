export interface IInformations {
  NotificationsConfigurations: {
    name: string;
    email: string;
    role: string;
    contactNumber: string;
    id: string;
  }[];
  name: string;
}

export interface IRequestMainContactInformations {
  buildingNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<IInformations>>;
}
