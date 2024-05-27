export interface SidebarContentProps {
  name: string;
  url: string;
  restricted: boolean;
  disabled?: boolean;
  restrictedForSyndic?: boolean;
}

export interface ISidebar {
  children: JSX.Element;
}

export interface IRequestCompanyLogo {
  setCompanyLogo: React.Dispatch<React.SetStateAction<string | null>>;
  buildingNanoId: string;
}
