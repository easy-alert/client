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
  Files: Files[];
  Folders: Folder[];
}

export interface IRequestFolderDetails {
  folderId: string;
  setInformations: React.Dispatch<React.SetStateAction<Folders | undefined>>;
  setBreadcrumb: React.Dispatch<React.SetStateAction<Folder[]>>;
  rootFolder: Folder;
}

export interface IRequestAnnexInformations {
  buildingNanoId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBuildingName: React.Dispatch<React.SetStateAction<boolean>>;
  setInformations: React.Dispatch<React.SetStateAction<Folders | undefined>>;
  setRootFolder: React.Dispatch<React.SetStateAction<Folder>>;
}
