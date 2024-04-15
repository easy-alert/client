export interface IInformations {
  Banners: {
    bannerName: string;
    id: string;
    originalName: string;
    redirectUrl: string;
    type: 'Web' | 'Mobile';
    url: string;
  }[];

  Company: {
    supportLink: string;
    canAccessTickets: boolean;
  };

  name: string;
}

export interface IRequestHomeInformations {
  buildingNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<IInformations>>;
}
