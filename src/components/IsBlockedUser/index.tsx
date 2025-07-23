// GLOBAL ICONS
import { icon } from '@assets/icons';

// STYLES
import * as Style from './styles';

export const IsBlockedUser = () => (
  <Style.Container>
    <Style.Content>
      <Style.LogoIcon src={icon.logoBlack} />

      <Style.TextContainer>
        <Style.MainText>
          A Easy Alert é um sistema que ajuda a cuidar das manutenções tno prédio.
        </Style.MainText>

        <Style.MainText>
          Ajudamos síndicos e construtoras a cuidarem melhor dos imóveis, evitando problemas e
          gastos desnecessários.
        </Style.MainText>
      </Style.TextContainer>

      <Style.ButtonContainer>
        <Style.ActionButton
          type="button"
          onClick={() => {
            window.open('https://easyalert.com.br/', '_blank');
          }}
        >
          CLIQUE AQUI PARA SABER MAIS
        </Style.ActionButton>
      </Style.ButtonContainer>

      <Style.ImageContainer>
        <Style.PersonImage src={icon.persona} />
      </Style.ImageContainer>
    </Style.Content>
  </Style.Container>
);
