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

export function useTicketFormConfigApi(companyId: string) {
  const loadConfig = async (): Promise<Partial<TicketFormConfig>> => {
    const response = await Api.get<Partial<TicketFormConfig>>('/ticket-form-config', { params: { companyId } });
    return response.data;
  };

  return { loadConfig } as const;
}
