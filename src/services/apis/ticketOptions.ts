import { Api } from '@services/api';

export type PlaceDTO = { id: string; label: string; companyId?: string | null };
export type ServiceTypeDTO = { id: string; singularLabel: string; companyId?: string | null };

export class TicketOptionsService {
  private companyId: string;

  constructor(companyId: string) {
    this.companyId = companyId;
  }

  async listPlaces(): Promise<PlaceDTO[]> {
    const { data } = await Api.get('/list/tickets/places', {
      params: { companyId: this.companyId },
    });
    return data.ticketPlaces || [];
  }

  async listServiceTypes(): Promise<ServiceTypeDTO[]> {
    const { data } = await Api.get('/list/tickets/service-types', {
      params: { companyId: this.companyId },
    });
    return data.ticketServiceTypes || [];
  }

  async createPlace(label: string): Promise<PlaceDTO> {
    const { data } = await Api.post('/tickets/places', { label, companyId: this.companyId });
    return data.place as PlaceDTO;
  }

  async createServiceType(name: string): Promise<ServiceTypeDTO> {
    const { data } = await Api.post('/tickets/service-types', { name, companyId: this.companyId });
    return data.serviceType as ServiceTypeDTO;
  }
}
