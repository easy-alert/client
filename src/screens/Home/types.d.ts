export type TTranslateTicketType = 'none' | 'whatsapp' | 'email' | 'link' | 'platform';

export interface IInformations {
  Banners: {
    id: string;
    originalName: string;
    redirectUrl: string;
    url: string;
  }[];

  Company: {
    canAccessTickets: boolean;
    ticketType: TTranslateTicketType;
    ticketInfo: string | null;
  };

  name: string;
}

export interface IRequestHomeInformations {
  buildingId: string;
}
