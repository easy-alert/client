// REACT
import { useState, useEffect } from 'react';

// LIBS
import { useParams } from 'react-router-dom';

// SERVICES
import { Api } from '@services/api';

// GLOBAL COMPONENTS
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Image } from '@components/Image';

// UTILS
import { applyMask, catchHandler } from '@utils/functions';

// ASSETS

// GLOBAL STYLES
import type { ISupplier } from '@customTypes/ISupplier';

// COMPONENTS
import { SupplierMaintenanceHistory } from './SupplierMaintenanceHistory';

// STYLES
import * as Style from './styles';

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
    state: '',
    categories: [],
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
    if (supplierId) {
      findSupplierById();
    }
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
              <h6>Categoria</h6>
              <p className="p2">
                {supplier.categories.map(({ category }) => category.name).join(', ')}
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
