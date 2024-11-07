import type { ITicket } from './ITicket';

export interface ITicketActivities {
  id: string;

  ticketId: string;
  type: string;
  title: string;
  content: string;

  createdAt: string;
  updatedAt: string;

  ticket: ITicket;
  images: any[];
}
