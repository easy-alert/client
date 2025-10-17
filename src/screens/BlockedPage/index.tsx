// GLOBAL ICONS
import { icon } from '@assets/icons';

// STYLES
import * as Style from './styles';

export const BlockedPage = () => {
  const handleSendWhatApp = async () => {
    try {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

      const phone = '5548991537724';
      const message = 'Olá, vi o QR Code e quero saber mais sobre a Easy Alert';

      const whatsappDeepLink = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
      const whatsappUri = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
      const whatsappUrl = isMobile ? whatsappDeepLink : whatsappUri;

      window.open(whatsappUrl, '_blank');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Erro ao compartilhar no WhatsApp:', err);
    }
  };

  return (
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
          <Style.ActionButton type="button" onClick={handleSendWhatApp}>
            CLIQUE AQUI PARA SABER MAIS
          </Style.ActionButton>
        </Style.ButtonContainer>

        <Style.ImageContainer>
          <Style.PersonImage src={icon.persona} />
        </Style.ImageContainer>
      </Style.Content>
    </Style.Container>
  );
};
