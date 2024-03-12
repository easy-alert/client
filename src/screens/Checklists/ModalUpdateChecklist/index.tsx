import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import * as Style from './styles';
import { Modal } from '../../../components/Modal';
import { ITimeInterval } from '../../../utils/types';
import { FormikInput } from '../../../components/Form/FormikInput';
import { Api } from '../../../services/api';
import {
  applyMask,
  capitalizeFirstLetter,
  catchHandler,
  convertToFormikDate,
} from '../../../utils/functions';
import { FormikSelect } from '../../../components/Form/FormikSelect';
import { Input } from '../../../components/Inputs/Input';
import { FormikCheckbox } from '../../../components/Form/FormikCheckbox';
import { FormikTextArea } from '../../../components/Form/FormikTextArea';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { InputRadio } from '../../../components/Inputs/InputRadio';
import { PopoverButton } from '../../../components/Buttons/PopoverButton';
import { theme } from '../../../styles/theme';

interface IModalUpdateChecklist {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeIntervals: ITimeInterval[];
  checklistId: string;
  onThenRequest: () => Promise<void>;
}

interface IChecklist {
  id: string;
  name: string;
  description: string | null;
  date: string;
  frequency: string | null;
  status: 'pending' | 'completed';
  building: { name: string; id: string };
  syndic: { name: string; id: string };
  frequencyTimeInterval: { id: string } | null;

  resolutionDate: string | null;
}

const schema = yup
  .object({
    id: yup.string(),
    name: yup.string().required('Campo obrigatório.'),
    syndicId: yup.string().required('Campo obrigatório.'),
    description: yup.string(),
    date: yup.string().required('Campo obrigatório.'),

    hasFrequency: yup.boolean(),

    frequency: yup
      .string()
      .matches(/^\d/, 'O prazo para execução deve ser um número.')
      .when('hasFrequency', {
        is: (hasFrequency: boolean) => hasFrequency,
        then: yup
          .string()
          .matches(/^\d/, 'O prazo para execução deve ser um número.')
          .required('Campo obrigatório.'),
      }),
    frequencyTimeIntervalId: yup.string().required('Campo obrigatório.'),
  })
  .required();

type TSchema = yup.InferType<typeof schema>;

type TUpdateMode = 'this' | 'thisAndFollowing' | '';

export const ModalUpdateChecklist = ({
  setModal,
  timeIntervals,
  onThenRequest,
  checklistId,
}: IModalUpdateChecklist) => {
  const [updateMode, setUpdateMode] = useState<TUpdateMode>('');
  const [syndics, setSyndics] = useState<{ name: string; id: string }[]>([]);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<IChecklist>({
    building: { id: '', name: '' },
    date: '',
    description: '',
    frequency: '',
    id: '',
    name: '',
    resolutionDate: '',
    status: 'pending',
    syndic: { id: '', name: '' },
    frequencyTimeInterval: { id: '' },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const listSyndics = async (buildingNanoId: string) => {
    // rota diferente pro company,essa já existia
    await Api.get(`/syndics/${buildingNanoId}`)
      .then((res) => {
        setSyndics(res.data);
      })
      .catch((err) => {
        catchHandler(err);
      });
  };

  const findChecklistById = async () => {
    await Api.get(`/checklists/${checklistId}`)
      .then(async (res) => {
        setChecklist(res.data.checklist);
        await listSyndics(res.data.checklist.building.nanoId);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const inputs = [
    { id: '1', name: 'mode', value: 'this', label: 'Este checklist' },
    { id: '2', name: 'mode', value: 'thisAndFollowing', label: 'Este e os checklists seguintes' },
  ];

  const handleOnChange = (value: TUpdateMode) => {
    setUpdateMode(value);
  };

  useEffect(() => {
    findChecklistById();
  }, []);

  return (
    <Modal setModal={setModal} title="Editar checklist">
      <Style.Container>
        {loading && (
          <Style.LoadingContainer>
            <DotSpinLoading />
          </Style.LoadingContainer>
        )}

        {!loading &&
          !updateMode &&
          inputs.map((input) => (
            <InputRadio
              id={input.id}
              key={input.value}
              value={input.value}
              name={input.name}
              label={input.label}
              checked={updateMode === input.value}
              onChange={(evt) => handleOnChange(evt.target.value as TUpdateMode)}
            />
          ))}

        {!loading && updateMode && (
          <Formik
            initialValues={{
              id: checklist.id,
              name: checklist.name,
              date: convertToFormikDate(new Date(checklist.date)),
              frequency: checklist.frequency || '',
              frequencyTimeIntervalId: checklist.frequencyTimeInterval?.id || timeIntervals[0].id,
              description: checklist.description || '',
              syndicId: checklist.syndic.id,
              hasFrequency: !!checklist.frequency,
            }}
            validationSchema={schema}
            onSubmit={async (values: TSchema) => {
              setOnQuery(true);

              await Api.put(`/checklists`, {
                ...values,
                frequency: values.frequency ? Number(values.frequency) : null,
                mode: updateMode,
              })
                .then((res) => {
                  onThenRequest();
                  toast.success(res.data.ServerMessage.message);
                  setModal(false);
                })
                .catch((err) => {
                  catchHandler(err);
                })
                .finally(() => {
                  setOnQuery(false);
                });
            }}
          >
            {({ errors, touched, values, setFieldValue, submitForm }) => (
              <Form>
                <Input
                  name="buildingName"
                  label="Edificação *"
                  defaultValue={checklist?.building.name}
                  disabled
                />

                <FormikInput
                  name="name"
                  label="Nome *"
                  placeholder="Ex: Retirar o lixo"
                  maxLength={200}
                  error={touched.name && (errors.name || null)}
                />

                <FormikSelect
                  name="syndicId"
                  selectPlaceholderValue={values.syndicId}
                  label="Responsável *"
                  error={touched.syndicId && (errors.syndicId || null)}
                >
                  <option value="" disabled hidden>
                    Selecione
                  </option>
                  {syndics.map(({ id, name }) => (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  ))}
                </FormikSelect>

                <FormikTextArea
                  label="Descrição"
                  placeholder="Insira a descrição"
                  name="description"
                  maxLength={200}
                  error={touched.description && (errors.description || null)}
                />

                <FormikInput
                  name="date"
                  label="Data *"
                  type="date"
                  error={touched.date && (errors.date || null)}
                />

                <FormikCheckbox
                  disable={updateMode === 'this'}
                  label="Periodicidade"
                  name="hasFrequency"
                  onChange={() => {
                    setFieldValue('hasFrequency', !values.hasFrequency);
                    setFieldValue('frequency', '');
                  }}
                />

                {values.hasFrequency && (
                  <Style.FrequencyWrapper>
                    <FormikInput
                      disabled={updateMode === 'this'}
                      name="frequency"
                      label="Periodicidade *"
                      placeholder="Ex: 2"
                      maxLength={4}
                      error={touched.frequency && (errors.frequency || null)}
                      onChange={(e) => {
                        setFieldValue(
                          'frequency',
                          applyMask({ mask: 'NUM', value: e.target.value }).value,
                        );
                      }}
                    />
                    <FormikSelect
                      disabled={updateMode === 'this'}
                      name="frequencyTimeIntervalId"
                      selectPlaceholderValue={values.frequencyTimeIntervalId}
                      label="Unidade *"
                    >
                      {timeIntervals.map(({ id, pluralLabel, singularLabel }) => (
                        <option value={id} key={id}>
                          {Number(values.frequency) > 1
                            ? capitalizeFirstLetter(pluralLabel)
                            : capitalizeFirstLetter(singularLabel)}
                        </option>
                      ))}
                    </FormikSelect>
                  </Style.FrequencyWrapper>
                )}
                <Style.ButtonDiv>
                  <PopoverButton
                    loading={onQuery}
                    disabled={onQuery}
                    actionButtonBgColor={theme.color.actionDanger}
                    type="Button"
                    label="Salvar"
                    message={{
                      title:
                        updateMode === 'this'
                          ? 'Deseja editar este checklist?'
                          : 'Deseja editar este checklist e os seguintes?',

                      content:
                        updateMode === 'this'
                          ? 'Atenção, somente as informações deste checklist serão editadas. Caso o checklist tenha sido relatado, as informações do relato não serão alteradas.'
                          : 'Atenção, as informações deste checklist e os seguintes serão editadas. Caso o checklist tenha sido relatado, as informações do relato não serão alteradas.',
                      contentColor: theme.color.danger,
                    }}
                    actionButtonClick={submitForm}
                  />
                </Style.ButtonDiv>
              </Form>
            )}
          </Formik>
        )}
      </Style.Container>
    </Modal>
  );
};
