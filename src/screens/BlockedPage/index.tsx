// GLOBAL ICONS
import { icon } from '@assets/icons';

// STYLES
import * as Style from './styles';

export const BlockedPage = () => (
  <Style.Container>
    <Style.Content>
      <Style.LogoIcon src={icon.logoBlack} />

      <Style.TextContainer>
        <Style.MainText>
          A Easy Alert é um sistema que ajuda a cuidar das manutenções no prédio.
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
            window.open(
              'https://api.whatsapp.com/send?phone=5548991537724&text=Ol%C3%A1%2C%20vi%20o%20QR%20Code%20e%20quero%20saber%20mais%20sobre%20a%20Easy%20Alert',
              '_blank',
            );
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
