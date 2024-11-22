export interface IEventTag {
  status?: 'expired' | 'pending' | 'completed' | 'overdue' | 'occasional' | 'common' | 'ticket';
  label?: string;
  color?: string;
  bgColor?: string;
  fontWeight?: number | string;
}
