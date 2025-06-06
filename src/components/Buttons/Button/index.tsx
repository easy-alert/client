/* eslint-disable react/button-has-type */
// COMPONENTS
import { theme } from '../../../styles/theme';
import { Background, ContainerButton, SpinnerContent } from './styles';

// TYPES
import { IButton } from './utils/types';

export const Button = ({
  label,
  disable = false,
  loading = false,
  outlined = false,
  center = false,
  bgColor = theme.color.primary,
  borderless = false,
  textColor,
  ...rest
}: IButton) => (
  <Background center={center}>
    <ContainerButton
      bgColor={bgColor}
      loading={+loading}
      disable={disable}
      outlined={outlined}
      borderless={borderless}
      textColor={textColor}
    >
      <button {...rest} disabled={disable || loading}>
        {loading ? <SpinnerContent /> : <h6>{label}</h6>}
      </button>
    </ContainerButton>
  </Background>
);
