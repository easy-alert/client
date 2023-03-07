export interface IInformations {
  Banners: {
    bannerName: string;
    id: string;
    originalName: string;
    redirectUrl: string;
    type: 'Web' | 'Mobile';
    url: string;
  }[];

  name: string;
}

export interface IRequestHomeInformations {
  buildingId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<IInformations>>;
}
