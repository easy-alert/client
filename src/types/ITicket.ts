export interface ITicketStatus {
  backgroundColor: string;
  color: string;
  label: string;
  name: string;
}

export interface ITicketPlace {
  id: string;
  label: string;
}

export interface ITicketType {
  type: {
    id: string;
    label: string;
  };
}

export interface ITicketImage {
  id: string;
  name: string;
  ticketId: string;
  url: string;
  createAt: string;
  updateAt: string;
}

export interface ITicket {
  id: string;
  residentName: string;
  residentApartment: string;
  residentEmail: string;
  description: string;
  placeId: string;
  statusName: string;
  buildingId: string;
  ticketNumber: number;
  createdAt: string;
  updatedAt: string;
  images: ITicketImage[];
  status: ITicketStatus;
  place: ITicketPlace;
  types: ITicketType[];
}
