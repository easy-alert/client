// REACT
import { useEffect, useState } from 'react';

// LIBS
import { useParams } from 'react-router-dom';

// SERVICES
import { Api } from '@services/api';

// CONTEXTS
// HOOKS
import { useBrasilCities } from '@hooks/useBrasilCities';
import { useBrasilStates } from '@hooks/useBrasilStates';
import { useCategoriesByNanoId } from '@hooks/useCategoriesByNanoId';

// GLOBAL COMPONENTS
import { Image } from '@components/Image';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Pagination } from '@components/Pagination';
import { ListTag } from '@components/ListTag';
import { Button } from '@components/Buttons/Button';
import { Select } from '@components/Inputs/Select';
import { Input } from '@components/Inputs/Input';

// UTILS
import { applyMask, catchHandler, convertStateName } from '@utils/functions';

// ASSETS
import { icon } from '@assets/icons';

// GLOBAL STYLES

// GLOBAL TYPES
import type { ISupplier } from '@customTypes/ISupplier';

// COMPONENTS

// STYLES
import * as Style from './styles';
import { PaginationFooter } from '../../Tickets/styles';

export const SuppliersList = () => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };

  const { states, selectedStateAcronym, setSelectedStateAcronym } = useBrasilStates();
  const { cities } = useBrasilCities({ UF: selectedStateAcronym });
  const { allCategories } = buildingNanoId
    ? useCategoriesByNanoId(buildingNanoId)
    : { allCategories: [] };

  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [supplierCounts, setSupplierCounts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const [onQuery, setOnQuery] = useState(false);
  const [filter, setFilter] = useState({ search: '', serviceTypeLabel: '', state: '', city: '' });

  const findManySuppliers = async (pageParam?: number) => {
    await Api.get(
      `/suppliers?buildingNanoId=${buildingNanoId}&page=${
        pageParam || page
      }&filter=${JSON.stringify(filter)}`,
    )
      .then((res) => {
        setSuppliers(res.data.suppliers);
        setSupplierCounts(res.data.suppliersCount);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
        setOnQuery(false);
      });
  };

  useEffect(() => {
    if (filter.search === '') {
      findManySuppliers();
    }
  }, [filter.search]);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      <Style.Container>
        <Style.Header>
          <Style.LeftSide>
            <h2>Fornecedores</h2>
            {/*
          <Style.SearchField>
            <IconButton
              icon={icon.search}
              size="16px"
              onClick={() => {
                findManySuppliers(search);
              }}
            />
            <input
              type="text"
              placeholder="Procurar"
              value={search}
              onChange={(evt) => {
                setSearch(evt.target.value);
                if (evt.target.value === '') {
                  findManySuppliers('');
                }
              }}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter') {
                  findManySuppliers(search);
                }
              }}
            />
          </Style.SearchField> */}
          </Style.LeftSide>
        </Style.Header>

        <Style.FilterWrapper>
          <h5>Filtros</h5>
          <Style.FilterInputs>
            <Input
              label="Busca"
              placeholder="Digite o parâmetro de busca"
              value={filter.search}
              onChange={(evt) => {
                setFilter((prev) => ({ ...prev, search: evt.target.value }));
              }}
              onKeyUp={({ key }) => {
                if (key === 'Enter') {
                  findManySuppliers();
                }
              }}
            />

            <Select
              label="Categoria"
              value={filter.serviceTypeLabel}
              selectPlaceholderValue={filter.serviceTypeLabel}
              onChange={(evt) => {
                setFilter((prev) => ({ ...prev, serviceTypeLabel: evt.target.value }));
              }}
            >
              <option value="">Todas</option>

              {allCategories.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Select>

            <Select
              value={filter.state}
              selectPlaceholderValue={filter.state}
              label="Estado"
              onChange={(evt) => {
                setFilter((prev) => ({ ...prev, state: evt.target.value, city: '' }));

                setSelectedStateAcronym(convertStateName(evt.target.value));
              }}
            >
              <option value="">Todos</option>
              {states.map(({ nome }) => (
                <option value={nome} key={nome}>
                  {nome}
                </option>
              ))}
            </Select>

            <Select
              label="Cidade"
              value={filter.city}
              selectPlaceholderValue={filter.city}
              onChange={(evt) => {
                setFilter((prev) => ({ ...prev, city: evt.target.value }));
              }}
            >
              <option value="">Todas</option>
              {cities.map(({ nome }) => (
                <option value={nome} key={nome}>
                  {nome}
                </option>
              ))}
            </Select>
            <Button
              loading={onQuery}
              label="Filtrar"
              onClick={() => {
                setOnQuery(true);
                findManySuppliers();
              }}
            />
          </Style.FilterInputs>
        </Style.FilterWrapper>

        {suppliers?.length > 0 && (
          <Style.PaginationContainer>
            <Style.Wrapper>
              {suppliers.map((supplier) => (
                <Style.Card
                  key={supplier.id}
                  to={`/suppliers/${buildingNanoId}/${supplier.id}${window.location.search}`}
                >
                  <Style.ImageDiv>
                    <Image img={supplier.image} size="100px" />
                  </Style.ImageDiv>

                  <Style.CardContent>
                    <h5>{supplier.name}</h5>

                    <Style.Tags>
                      {supplier.categories.map(({ category }) => (
                        <ListTag
                          key={category.id}
                          label={category.name}
                          fontSize="14px"
                          lineHeight="16px"
                        />
                      ))}
                    </Style.Tags>

                    <p className="p">{`${supplier.city} / ${supplier.state}`}</p>
                  </Style.CardContent>

                  <Style.CardFooter>
                    <Style.Line />
                    <p className="p4">
                      {supplier.phone
                        ? applyMask({ mask: 'TEL', value: supplier.phone }).value
                        : '-'}
                    </p>
                    <p className="p4">{supplier.email || '-'}</p>
                  </Style.CardFooter>
                </Style.Card>
              ))}
            </Style.Wrapper>
            <PaginationFooter>
              <Pagination
                totalCountOfRegister={supplierCounts}
                currentPage={page}
                registerPerPage={10}
                onPageChange={(pageParam) => {
                  setPage(pageParam);
                  findManySuppliers(pageParam);
                }}
              />
            </PaginationFooter>
          </Style.PaginationContainer>
        )}
      </Style.Container>
      {suppliers.length === 0 && (
        <Style.NoDataContainer>
          <Image img={icon.paper} size="80px" radius="0" />
          <h3>Nenhum fornecedor encontrado.</h3>
        </Style.NoDataContainer>
      )}
    </>
  );
};
