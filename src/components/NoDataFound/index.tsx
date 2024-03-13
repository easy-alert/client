import { icon } from '../../assets/icons';
import { Image } from '../Image';
import * as Style from './styles';
import { INoDataFound } from './types';

export const NoDataFound = ({ label, height = '80dvh' }: INoDataFound) => (
  <Style.Container height={height}>
    <Image img={icon.paper} size="80px" />
    <h5>{label}</h5>
  </Style.Container>
);
