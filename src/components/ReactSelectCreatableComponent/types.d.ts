import { ActionMeta, Options } from 'react-select';

export interface IReactSelectCreatableComponent {
  isDisabled?: boolean;
  label?: string;
  name: string;
  id: string;
  placeholder: string;
  isClearable?: boolean;
  isMulti?: boolean;
  noOptionsMessage?: () => string;
  maxMenuHeight?: number;
  onChange?: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined;
  onCreateOption?: (inputValue: string) => void;
  isOptionDisabled?: ((option: any, selectValue: Options<any>) => boolean) | undefined;
  isLoading?: boolean;
  value?: any;
  options: {
    label: any;
    value: any;
    companyId?: string | null;
  }[];
  newCustomStyle?: any;
  defaultValue?: {
    label: string;
    value: string;
  }[];
  error?: any;
  selectPlaceholderValue: any;
}
