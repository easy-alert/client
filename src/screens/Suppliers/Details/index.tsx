/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../../services/api';
import { applyMask, catchHandler } from '../../../utils/functions';
import * as Style from './styles';
import { ReturnButton } from '../../../components/Buttons/ReturnButton';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { Image } from '../../../components/Image';
import { SupplierMaintenanceHistory } from './SupplierMaintenanceHistory';

export interface ISupplier {
  id: string;
  image: string;
  name: string;
  state: string;
  city: string;
  cnpj: string | null;

  phone: string | null;
  email: string | null;
  link: string | null;

  areaOfActivities: {
    areaOfActivity: { label: string };
  }[];
}

export const SupplierDetails = () => {
  const { supplierId } = useParams() as { supplierId: string };

  const [loading, setLoading] = useState(true);

  const [supplier, setSupplier] = useState<ISupplier>({
    email: '',
    id: '',
    image: '',
    link: '',
    name: '',
    phone: '',
    cnpj: '',
    city: '',
    areaOfActivities: [],
    state: '',
  });

  const findSupplierById = async () => {
    await Api.get(`/suppliers/${supplierId}`)
      .then((res) => {
        setSupplier(res.data.supplier);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findSupplierById();
  }, []);

  return (
    <>
      {loading && <DotSpinLoading />}

      {!loading && (
        <>
          <Style.Header>
            <h2>Detalhes de fornecedor</h2>
          </Style.Header>

          <ReturnButton />
          <Style.CardSection>
            <Style.Card>
              <h6>Imagem/Logo</h6>
              <Image img={supplier?.image} size="80px" />
            </Style.Card>

            <Style.Card>
              <h6>Nome</h6>
              <p className="p2">{supplier.name}</p>
            </Style.Card>

            <Style.Card>
              <h6>CNPJ</h6>
              <p className="p2">
                {supplier.cnpj ? applyMask({ mask: 'CNPJ', value: supplier.cnpj }).value : '-'}
              </p>
            </Style.Card>

            <Style.Card>
              <h6>E-mail</h6>
              <p className="p2">{supplier.email || '-'}</p>
            </Style.Card>

            <Style.Card>
              <h6>Telefone/Celular</h6>
              <p className="p2">
                {supplier.phone ? applyMask({ mask: 'TEL', value: supplier.phone }).value : '-'}
              </p>
            </Style.Card>

            <Style.Card>
              <h6>Área de atuação</h6>
              <p className="p2">
                {supplier.areaOfActivities
                  .map(({ areaOfActivity }) => areaOfActivity.label)
                  .join(', ')}
              </p>
            </Style.Card>

            <Style.Card>
              <h6>Estado</h6>
              <p className="p2">{supplier.state || '-'}</p>
            </Style.Card>

            <Style.Card>
              <h6>Cidade</h6>
              <p className="p2">{supplier.city || '-'}</p>
            </Style.Card>

            <Style.Card>
              <h6>Link</h6>
              {supplier.link ? (
                <a target="_blank" rel="noreferrer" className="p2" href={supplier.link}>
                  {supplier.link}
                </a>
              ) : (
                '-'
              )}
            </Style.Card>
          </Style.CardSection>

          <SupplierMaintenanceHistory />
        </>
      )}
    </>
  );
};
