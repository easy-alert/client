// UI
import * as Style from './styles';
// TYPES
import { IModal } from './types';

export const FullScreenModal = ({ children, title }: IModal) => (
  <Style.Container>
    <Style.Body>
      <Style.Header>
        <h2>{title}</h2>
      </Style.Header>
      {children}
    </Style.Body>
  </Style.Container>
);
