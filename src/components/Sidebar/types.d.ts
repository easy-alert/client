export interface SidebarContentProps {
  name: string;
  url: string;
  restricted: boolean;
}

export interface ISidebar {
  children: JSX.Element;
}

export interface IRequestCompanyLogo {
  setCompanyLogo: React.Dispatch<React.SetStateAction<string | null>>;
  buildingId: string;
}
