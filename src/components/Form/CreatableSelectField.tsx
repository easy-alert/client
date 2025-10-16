import { ReactSelectCreatableComponent } from '@components/ReactSelectCreatableComponent';

type Opt = { id: string; label: string; companyId?: string | null };

export function CreatableSelectField({
  label,
  isMulti,
  valueIds,
  options,
  onChangeIds,
  onCreate,
  placeholder = 'Selecione',
}: {
  label: string;
  isMulti?: boolean;
  valueIds: string[] | string | null;
  options: Opt[];
  onChangeIds: (ids: string[] | string | null) => void;
  onCreate?: (input: string) => Promise<void>;
  placeholder?: string;
}) {
  const mappedOptions = options.map((o) => ({
    label: o.label,
    value: o.id,
    companyId: o.companyId,
  }));
  const mappedValue = Array.isArray(valueIds)
    ? mappedOptions.filter((o) => valueIds.includes(o.value))
    : mappedOptions.find((o) => o.value === valueIds) || null;

  return (
    <ReactSelectCreatableComponent
      label={label}
      isMulti={!!isMulti}
      id={label}
      name={label}
      options={mappedOptions}
      value={mappedValue}
      placeholder={placeholder}
      onChange={(evt: any) => {
        if (Array.isArray(evt)) onChangeIds(evt.map((e: any) => e.value));
        else onChangeIds(evt?.value || null);
      }}
      onCreateOption={onCreate}
      selectPlaceholderValue={Array.isArray(valueIds) ? valueIds.length : valueIds}
    />
  );
}
