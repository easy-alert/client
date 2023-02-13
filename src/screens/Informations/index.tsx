// COMPONENTS
import { Image } from '../../components/Image';

// STYLES
import * as Style from './styles';
import { icon } from '../../assets/icons';

export const Informations = () => {
  const teste = Array.from(Array(20).keys());

  return (
    <Style.Container>
      <h2>Informações</h2>

      <Style.Card>
        <h2>Dados do responsável</h2>
        <Style.RowWrapper>
          <Style.Row>
            <h6>Nome</h6>
            <p className="p4">Augusto Mandelli</p>
          </Style.Row>
          <Style.Line />
          <Style.Row>
            <h6>E-mail</h6>
            <p className="p4">augusto.mandelli@easyalert.com</p>
          </Style.Row>
          <Style.Line />

          <Style.Row>
            <h6>WhatsApp</h6>
            <p className="p4">48 99689-3086</p>
          </Style.Row>

          <Style.Line />
          <Style.Row>
            <h6>Função</h6>
            <p className="p4">Síndico</p>
          </Style.Row>
          <Style.Line />
          <Style.Row>
            <h6>Anexos</h6>
            <Style.AnnexesRow>
              {teste.map((e) => (
                <Style.Tag key={e}>
                  <a
                    title="https://larguei.s3.us-west-2.amazonaws.com/Rectangle%20600-1676305848576.png"
                    href="https://larguei.s3.us-west-2.amazonaws.com/Rectangle%20600-1676305848576.png"
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p3">quadro</p>
                    <Image size="16px" img={icon.download} />
                  </a>
                </Style.Tag>
              ))}
            </Style.AnnexesRow>
          </Style.Row>
        </Style.RowWrapper>
      </Style.Card>
    </Style.Container>
  );
};
