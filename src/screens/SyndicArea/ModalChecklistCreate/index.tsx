// REACT
import { useEffect, useState } from 'react';

// HOOKS
import { useUsersForSelect } from '@hooks/useUsersForSelect';

// SERVICES
import { getChecklistsTemplates } from '@services/apis/getChecklistsTemplates';
import { createChecklist } from '@services/apis/createChecklist';
import { createChecklistTemplate } from '@services/apis/createChecklistTemplate';

// GLOBAL COMPONENTES
import { Button } from '@components/Buttons/Button';
import { Modal } from '@components/Modal';
import { Input } from '@components/Inputs/Input';
import { Select } from '@components/Inputs/Select';
import { LoadingWrapper } from '@components/Loadings/LoadingWrapper';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { handleToastifyMessage } from '@utils/toastifyResponses';

// GLOBAL TYPES
import type { IChecklistTemplate } from '@customTypes/IChecklistTemplate';
import type { TChecklistStatus } from '@customTypes/IChecklist';

// COMPONENTS
import { InputRadio } from '@components/Inputs/InputRadio';
import { NewChecklist } from './NewChecklist';
import { ModelTemplate } from './ModelTemplate';

// STYLES
import * as Style from './styles';

interface IModalChecklistCreate {
  buildingId: string;
  handleModals: (modal: string, modalState: boolean) => void;
  handleRefresh: () => void;
}

export const ModalChecklistCreate = ({
  buildingId,
  handleModals,
  handleRefresh,
}: IModalChecklistCreate) => {
  const { usersForSelect } = useUsersForSelect({
    buildingId,
    checkPerms: true,
  });

  const [checklistTemplates, setChecklistTemplates] = useState<IChecklistTemplate[]>([]);

  const [newChecklist, setNewChecklist] = useState<IChecklistTemplate>({
    name: 'Insira o título',
    items: [],
  });
  const [selectedChecklistTemplate, setSelectedChecklistTemplate] = useState<IChecklistTemplate>(
    {},
  );

  const [selectedResponsible, setSelectedResponsible] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('0');
  const [startDate, setStartDate] = useState('');

  const [showTemplate, setShowTemplate] = useState(false);
  const [showNewChecklist, setShowNewChecklist] = useState(true);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const disableCreateButton = showTemplate
    ? !selectedChecklistTemplate.id || !selectedResponsible || !selectedInterval || !startDate
    : !newChecklist.name ||
      !newChecklist.items ||
      !selectedResponsible ||
      !selectedInterval ||
      !startDate;

  const handleShowTemplate = () => {
    setShowTemplate(true);
    setShowNewChecklist(false);
    setSelectedInterval('1');
  };

  const handleShowNewChecklist = () => {
    setShowNewChecklist(true);
    setShowTemplate(false);
    setSelectedChecklistTemplate({});
    setSelectedInterval('0');
  };

  const handleNewChecklistTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChecklist({ ...newChecklist, name: e.target.value });
  };

  const handleNewChecklistItemChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newItems = newChecklist.items || [];

    newItems[index] = { id: index.toString(), name: e.target.value };

    setNewChecklist({ ...newChecklist, items: newItems });
  };

  const handleNewChecklistItemDelete = (index: number) => {
    const newItems = newChecklist.items || [];

    newItems.splice(index, 1);

    setNewChecklist({ ...newChecklist, items: newItems });
  };

  const handleResponsibleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResponsible(e.target.value);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(e.target.value);
  };

  const handleCreateChecklistTemplate = async (checklistTemplate: IChecklistTemplate) => {
    setLoading(true);

    try {
      await createChecklistTemplate({
        buildingId,
        name: checklistTemplate.name!,
        items: checklistTemplate.items!,
      });
    } finally {
      setRefresh(!refresh);
      setLoading(false);
      handleShowTemplate();
    }
  };

  const handleCreateChecklist = async (status: TChecklistStatus) => {
    setLoading(true);

    if (disableCreateButton) {
      handleToastifyMessage({ type: 'error', message: 'Preencha todos os campos obrigatórios.' });
      setLoading(false);
      return;
    }

    try {
      await createChecklist({
        buildingId,
        checklistTemplateId: selectedChecklistTemplate.id,
        newChecklist,
        responsibleId: selectedResponsible,
        startDate,
        interval: selectedInterval,
        status,
      });
    } finally {
      setLoading(false);
      handleRefresh();
      handleModals('modalChecklistCreate', false);
    }
  };

  useEffect(() => {
    const handleGetChecklistsTemplate = async () => {
      setLoading(true);

      try {
        const responseData = await getChecklistsTemplates({ buildingId });
        setChecklistTemplates(responseData);
      } finally {
        setLoading(false);
      }
    };

    if (buildingId) {
      handleGetChecklistsTemplate();
    }
  }, [refresh, buildingId]);

  return (
    <Modal title="Checklist" setModal={(state) => handleModals('modalChecklistCreate', state)}>
      {loading ? (
        <LoadingWrapper minHeight="300px">
          <DotSpinLoading />
        </LoadingWrapper>
      ) : (
        <Style.Content>
          <Style.ChecklistButtons>
            <InputRadio
              id="newChecklist"
              label="Avulso"
              checked={showNewChecklist}
              onChange={handleShowNewChecklist}
            />

            <InputRadio
              id="useTemplate"
              label="Usar template"
              checked={showTemplate}
              onChange={handleShowTemplate}
            />
          </Style.ChecklistButtons>

          {showNewChecklist && (
            <NewChecklist
              newChecklist={newChecklist}
              handleNewChecklistTitleChange={handleNewChecklistTitleChange}
              handleNewChecklistItemChange={handleNewChecklistItemChange}
              handleNewChecklistItemDelete={handleNewChecklistItemDelete}
              handleCreateChecklistTemplate={handleCreateChecklistTemplate}
            />
          )}

          {showTemplate && (
            <ModelTemplate
              checklistTemplates={checklistTemplates}
              handleSelectChecklistTemplate={(template) => setSelectedChecklistTemplate(template)}
            />
          )}

          <Select
            label="Responsável *"
            value={selectedResponsible}
            onChange={handleResponsibleChange}
          >
            <option value="" disabled>
              Selecione
            </option>

            {usersForSelect.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </Select>

          {!showNewChecklist && (
            <Select
              label="Periodicidade *"
              value={selectedInterval}
              onChange={handleIntervalChange}
            >
              <option value="" disabled>
                Selecione
              </option>

              <option value="1">Diário</option>
              <option value="2">A cada 2 dias</option>
              <option value="3">A cada 3 dias</option>
              <option value="7">Semanal</option>
              <option value="30">Mensal</option>
              <option value="60">Bimestral</option>
              <option value="90">Trimestral</option>
              <option value="180">Semestral</option>
              <option value="365">Anual</option>
            </Select>
          )}

          <Input
            label="Data de início *"
            type="date"
            value={startDate}
            typeDatePlaceholderValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Style.ButtonContainer>
            <Button
              label="Criar"
              disable={disableCreateButton}
              onClick={() => handleCreateChecklist('pending')}
            />
            <Button
              label="Iniciar execução"
              bgColor="transparent"
              textColor="actionBlue"
              disable={disableCreateButton}
              onClick={() => handleCreateChecklist('inProgress')}
            />
          </Style.ButtonContainer>
        </Style.Content>
      )}
    </Modal>
  );
};
