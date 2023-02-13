// STYLES
import { Button } from '../../components/Buttons/Button';
import { Select } from '../../components/Inputs/Select';
import * as Style from './styles';

export const BuildingManagerArea = () => (
  <Style.Container>
    <h2>Monte Ravello</h2>
    <Style.FilterWrapper>
      <Select label="Ano" />
      <Select label="Mês" />
      <Select label="Status" />
      <Button type="button" label="Filtrar" />
    </Style.FilterWrapper>
  </Style.Container>
);
