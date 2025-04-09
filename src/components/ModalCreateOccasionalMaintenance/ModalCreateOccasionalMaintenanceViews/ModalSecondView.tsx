// LIBS
import { endOfDay, format, isAfter } from 'date-fns';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// GLOBAL COMPONENTS
import { Button } from '@components/Buttons/Button';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikInput } from '@components/Form/FormikInput';

// STYLES
import * as Style from '../styles';

// TYPES
import type { IModalSecondView } from '../types';

const validationSchema = Yup.object().shape({
  category: Yup.string().required('Categoria é obrigatória.'),
  element: Yup.string().required('Elemento é obrigatório.'),
  activity: Yup.string().required('Atividade é obrigatória.'),
  responsible: Yup.string().required('Responsável é obrigatório.'),
  priorityName: Yup.string().required('Prioridade é obrigatória.'),
  executionDate: Yup.string().required('Data de execução é obrigatória.'),
});

const ModalSecondView = ({
  categoriesData,
  priorityData,
  occasionalMaintenanceData,
  checklistActivity,
  handleSetView,
  handleOccasionalMaintenanceDataChange,
}: IModalSecondView) => {
  const responsibleArray = [
    { id: '1', name: 'Equipe de manutenção local' },
    { id: '2', name: 'Equipe capacitada' },
    { id: '3', name: 'Equipe Especializada' },
  ];

  const today = format(endOfDay(new Date()), 'yyyy-MM-dd');
  const isAfterToday = isAfter(occasionalMaintenanceData.executionDate, today);
  const disableFinishedButton = isAfterToday;

  const initialValues = {
    category: occasionalMaintenanceData.categoryData?.id || '',
    element: occasionalMaintenanceData.element || '',
    activity: occasionalMaintenanceData.activity || '',
    responsible: occasionalMaintenanceData.responsible || '',
    priorityName: occasionalMaintenanceData.priorityName || '',
    executionDate: occasionalMaintenanceData.executionDate || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => undefined}
    >
      {({ touched, errors }) => (
        <Form>
          <Style.FormContainer>
            <FormikSelect
              label="Categoria *"
              name="category"
              value={occasionalMaintenanceData.categoryData.id}
              onChange={(e) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'categoryData',
                  value: e.target.value,
                  secondaryKey: 'id',
                })
              }
              error={touched.category && errors.category ? errors.category : null}
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormikSelect>

            <FormikInput
              label="Elemento *"
              placeholder="Informe o elemento"
              name="element"
              value={occasionalMaintenanceData.element}
              onChange={(e) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'element',
                  value: e.target.value,
                })
              }
              error={touched.element && errors.element ? errors.element : null}
            />

            <FormikInput
              label="Atividade *"
              placeholder="Ex: Troca de lâmpada"
              name="activity"
              value={occasionalMaintenanceData.activity}
              disabled={!!checklistActivity}
              onChange={(e) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'activity',
                  value: e.target.value,
                })
              }
              error={touched.activity && errors.activity ? errors.activity : null}
            />

            <FormikSelect
              label="Responsável *"
              name="responsible"
              value={occasionalMaintenanceData.responsible}
              onChange={(e) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'responsible',
                  value: e.target.value,
                })
              }
              error={touched.responsible && errors.responsible ? errors.responsible : null}
            >
              <option value="" disabled>
                Selecione
              </option>
              {responsibleArray.map((responsible) => (
                <option key={responsible.id} value={responsible.name}>
                  {responsible.name}
                </option>
              ))}
            </FormikSelect>

            <FormikSelect
              label="Prioridade *"
              name="priorityName"
              value={occasionalMaintenanceData.priorityName}
              onChange={(e) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'priorityName',
                  value: e.target.value,
                })
              }
              error={touched.priorityName && errors.priorityName ? errors.priorityName : null}
            >
              <option value="" disabled>
                Selecione
              </option>
              {priorityData.map((priority) => (
                <option key={priority.name} value={priority.name}>
                  {priority.label}
                </option>
              ))}
            </FormikSelect>

            <FormikInput
              label="Data de execução *"
              type="date"
              name="executionDate"
              value={occasionalMaintenanceData.executionDate}
              onChange={(evt) =>
                handleOccasionalMaintenanceDataChange({
                  primaryKey: 'executionDate',
                  value: evt.target.value,
                })
              }
              error={touched.executionDate && errors.executionDate ? errors.executionDate : null}
            />

            <Style.ButtonContainer>
              <Button label="Criar" bgColor="transparent" textColor="actionBlue" type="submit" />
              <Button
                label="Iniciar execução"
                bgColor="transparent"
                textColor="actionBlue"
                type="submit"
              />
              <Button
                label="Criar finalizada"
                onClick={() => handleSetView(3)}
                disabled={disableFinishedButton}
              />
            </Style.ButtonContainer>
          </Style.FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default ModalSecondView;
