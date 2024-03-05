import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { icon } from '../../assets/icons';
import { Image } from '../../components/Image';
import { Api } from '../../services/api';
import { catchHandler } from '../../utils/functions';
import * as Style from './styles';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';

interface ISupplier {
  id: string;
  image: string;
  name: string;
  occupationArea: string;
  description: string;
  link: string;

  phone: string | null;
  email: string | null;
}

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [loading, setLoading] = useState<boolean>(true);

  const findLocalSuppliers = async () => {
    await Api.get(`/building/suppliers/${buildingNanoId}`)
      .then((res) => {
        setSuppliers(res.data.suppliers);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          window.open('https://easyalert.com.br/', '_self');
        } else {
          catchHandler(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findLocalSuppliers();
  }, []);

  return (
    <>
      <h2>Fornecedores</h2>

      {loading && (
        <Style.Container>
          <DotSpinLoading />
        </Style.Container>
      )}

      {!loading && suppliers?.length > 0 && (
        <Style.Wrapper>
          {suppliers.map((supplier) => (
            <Style.Card
              key={supplier.id}
              type="button"
              onClick={() => {
                window.open(supplier.link, '_blank');
              }}
            >
              <Style.ImageDiv>
                <Image img={supplier.image} size="100px" />
              </Style.ImageDiv>

              <Style.CardContent>
                <Style.CardHeader>
                  <h5>{supplier.name}</h5>
                  <p className="p2">{supplier.occupationArea}</p>
                </Style.CardHeader>

                <p className="p1">{supplier.description}</p>
              </Style.CardContent>

              <Style.CardFooter>
                <Style.Line />
                <p className="p4">{supplier.phone || '-'}</p>
                <p className="p4">{supplier.email || '-'}</p>
              </Style.CardFooter>
            </Style.Card>
          ))}
        </Style.Wrapper>
      )}

      {!loading && suppliers.length === 0 && (
        <Style.Container>
          <Image img={icon.paper} size="80px" radius="0" />
          <h3>Não existem fornecedores na sua região. Contate a Easy Alert.</h3>
        </Style.Container>
      )}
    </>
  );
};
