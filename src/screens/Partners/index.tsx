import { icon } from '../../assets/icons';
import { Image } from '../../components/Image';
import * as Style from './styles';

export const Partners = () => {
  const partners = [
    {
      href: 'https://www.pro6.com.br/',
      name: 'PRO6 Condomínios',
      icon: icon.pro6,
      text: 'A PRO6 aproxima compradores e prestadores de serviços especialistas no universo condominial com foco no que realmente importa, a qualidade dos serviços.',
    },
    {
      href: 'https://www.getninjas.com.br/',
      name: 'GetNinjas',
      icon: icon.getNinjas,
      text: 'GetNinjas é a maior plataforma de contratação de serviços do Brasil. Conectamos Profissionais de todo o Brasil com pessoas solicitando serviço, atendendo com qualidade, facilidade e rapidez todos os tipos de necessidade.',
    },
    {
      href: 'https://www.casadosindico.srv.br/',
      name: 'Casa do Síndico',
      icon: icon.casaDoSindico,
      text: 'A Casa do Síndico assessora na contratação de sua obra, desde o orçamento até a sua finalização, passando pela contratualização, o acompanhamento semanal por profissionais com conhecimento técnico, a fiscalização da execução dos serviços propriamente ditos, seja na qualidade dos acabamentos ou prazos de entrega, oferecendo garantias sem custo ao seu condomínio.',
    },
    {
      href: 'https://prestadoresdeservicos.com.br/',
      name: 'Prestadores de Serviços',
      icon: icon.prestadoresDeServicos,
      text: 'Cadastre seus serviços e receba solicitações direto do seu celular.',
    },
    {
      href: 'https://coteibem.sindiconet.com.br/',
      name: 'CoteiBem',
      icon: icon.coteiBem,
      text: 'Fornecedores especializados — Nossa missão é agilizar e simplificar cotações para síndicos e administradores prediais.',
    },
  ];

  return (
    <Style.Container>
      <h2>Parceiros</h2>
      <Style.Wrapper>
        {partners.map((partner) => (
          <Style.Card key={partner.name} href={partner.href} target="_blank">
            <Image img={partner.icon} width="80%" height="100px" radius="0" />
            <h5>{partner.name}</h5>
            <p className="p1">{partner.text}</p>
          </Style.Card>
        ))}
      </Style.Wrapper>
    </Style.Container>
  );
};
