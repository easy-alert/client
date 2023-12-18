// COMPONENTS
import { useNavigate, useParams } from 'react-router-dom';
// STYLES
import { useEffect, useState } from 'react';
import * as Style from './styles';
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { requestSyndicList } from './functions';
import { ISyndic } from './types';
import { Select } from '../../components/Inputs/Select';
import { Modal } from '../../components/Modal';

export const ChooseSyndic = () => {
  const { buildingNanoId, categoryId } = useParams() as {
    buildingNanoId: string;
    categoryId: string;
  };
  const navigate = useNavigate();
  const [syndics, setSyndics] = useState<ISyndic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    requestSyndicList({
      buildingNanoId: buildingNanoId!,
      setLoading,
      setSyndics,
    });
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <Modal
      title="Escolha o responsável"
      setModal={() => {
        //
      }}
    >
      <Style.Container>
        <Select
          value=""
          onChange={(e) => {
            navigate(
              `/syndicarea/${buildingNanoId}?syndicNanoId=${e.target.value}&categoryId=${categoryId}`,
            );
          }}
        >
          <option value="" hidden disabled>
            Selecione
          </option>
          {syndics.map((e) => (
            <option key={e.nanoId} value={e.nanoId}>
              {e.name}
            </option>
          ))}
        </Select>
      </Style.Container>
    </Modal>
  );
};
