export interface INotificationConfiguration {
  id: string;
  name: string;
  email: string;
  emailIsConfirmed: boolean;
  contactNumber: string;
  contactNumberIsConfirmed: boolean;
  role: string;
  isMain: boolean;
  showContact: boolean;
  nanoId: string;
}

interface File {
  name: string;
  id: string;
  url: string;
}

interface Folder {
  name: string;
  id: string;
}

interface Folders {
  name: string;
  id: string;
  Files: File[];
  Folders: Folder[];
}

export interface IBanner {
  originalName: string;
  redirectUrl: string | null;
  url: string;
  id: string;
}

interface MaintenanceCount {
  name: string;
  pluralLabel: string;
  singularLabel: string;
  count: number;
}

export interface IBuildingDetail {
  nanoId: string;
  id: string;
  name: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  streetName: string;
  deliveryDate: string;
  warrantyExpiration: string;
  keepNotificationAfterWarrantyEnds: boolean;
  BuildingType: {
    name: string;
    id: string;
  };
  Folders: Folders;
  NotificationsConfigurations: INotificationConfiguration[];
  MaintenancesCount: MaintenanceCount[];
  Banners: IBanner[];
  mandatoryReportProof: boolean;
}

export interface IRequestBuildingDetails {
  setLoading?: (setLoading: boolean) => void;
  setBuilding: (setBuilding: IBuildingDetail) => void;
  buildingNanoId: string;
  syndicNanoId: string;
  setRootFolder: React.Dispatch<React.SetStateAction<Folder>>;
}

export interface IRequestResendConfirmation {
  link: string;
  buildingNotificationConfigurationId: string;
}

export interface IChangeShowContactStatus {
  setShowContactLoading: React.Dispatch<React.SetStateAction<boolean>>;
  buildingNotificationConfigurationId: string;
  showContact: boolean;
}

export interface IRequestFolderDetails {
  folderId: string;
  setBuilding: React.Dispatch<React.SetStateAction<IBuildingDetail | undefined>>;
  setBreadcrumb: React.Dispatch<React.SetStateAction<Folder[]>>;
  rootFolder: Folder;
}
