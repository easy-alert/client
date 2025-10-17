export type TTranslateTicketType = 'none' | 'whatsapp' | 'email' | 'link' | 'platform';

export interface IInformations {
  Banners: {
    id: string;
    originalName: string;
    redirectUrl: string;
    url: string;
  }[];

  Company: {
    id: string;
    canAccessTickets: boolean;
    ticketType: TTranslateTicketType;
    ticketInfo: string | null;
  };

  name: string;
  isBlocked?: boolean;
}

export interface IRequestHomeInformations {
  buildingId: string;
}
