import type { IUser } from '@customTypes/IUser';

export interface IAccount {
  User?: IUser;

  Company?: {
    id: string;
    name: string;
    contactNumber: string;
    CNPJ?: string;
    CPF?: string;
    createdAt: string;
    image: string;
  };
}

export interface IUploadFile {
  Location: string;
  originalname: string;
}

export interface IMask {
  value: string;
  length: number;
}

export interface ITimeInterval {
  id: string;
  name: string;
  singularLabel: string;
  pluralLabel: string;
}

export interface IRequestListIntervals {
  setTimeIntervals: (setTimeIntervals: ITimeInterval[]) => void;
}

export interface IBuildingTypes {
  id: string;
  name: string;
}

export interface IRequestBuildingTypes {
  setBuildingTypes: (setBuildingTypes: IBuildingTypes[]) => void;
}

export interface IRequestAddressData {
  setFieldValue: any;
  cep: string;
}
