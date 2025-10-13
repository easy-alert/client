import { Api } from '@services/api';

export type TicketFormConfig = {
  residentName: { hidden: boolean; required: boolean };
  residentPhone: { hidden: boolean; required: boolean };
  residentApartment: { hidden: boolean; required: boolean };
  residentEmail: { hidden: boolean; required: boolean };
  residentCPF: { hidden: boolean; required: boolean };
  description: { hidden: boolean; required: boolean };
  placeId: { hidden: boolean; required: boolean };
  types: { hidden: boolean; required: boolean };
  attachments: { hidden: boolean; required: boolean };
};

export function useTicketFormConfigApi() {
  const loadConfig = async (): Promise<Partial<TicketFormConfig>> => {
    const response = await Api.get<Partial<TicketFormConfig>>('/ticket-form-config');
    return response.data;
  };

  return { loadConfig } as const;
}
