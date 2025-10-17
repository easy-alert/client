// REACT
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// COMPONENTS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// SERVICES
import { Api } from '@services/api';
import { getBuildingsApartmentsById } from '@services/apis/getBuildingsApartmentsById';

// GLOBAL COMPONENTS
import { Button } from '@components/Buttons/Button';
import { DragAndDropFiles } from '@components/DragAndDropFiles';
import { CreatableSelectField } from '@components/Form/CreatableSelectField';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikTextArea } from '@components/Form/FormikTextArea';
import { ImagePreview } from '@components/ImagePreview';
import { Input } from '@components/Inputs/Input';
import { ListTag } from '@components/ListTag';
import { DotLoading } from '@components/Loadings/DotLoading';
import { Modal } from '@components/Modal';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// GLOBAL TYPES
import { IBuildingApartment } from '@customTypes/IBuildingApartments';

// GLOBAL UTILS
import { applyMask, catchHandler, isImage, unMask, uploadManyFiles } from '@utils/functions';

// STYLES
import { useOptimisticSelect } from '@hooks/useOptimisticSelect';
import { TicketFormConfig, useTicketFormConfigApi } from '@hooks/useTicketFormConfigApi';
import { TicketOptionsService } from '@services/apis/ticketOptions';
import * as Style from './styles';

interface IModalCreateTicket {
  companyId: string;
  buildingId: string;
  buildingName: string;
  handleCreateTicketModal: (modal: boolean) => void;
  handleRefresh?: () => void;
}

interface IAuxiliaryData {
  id: string;
  label: string;
}

const defaultConfig: TicketFormConfig = {
  residentName: { hidden: false, required: true },
  residentPhone: { hidden: false, required: true },
  residentApartment: { hidden: false, required: true },
  residentEmail: { hidden: false, required: true },
  residentCPF: { hidden: false, required: true },
  description: { hidden: false, required: true },
  placeId: { hidden: false, required: true },
  types: { hidden: false, required: true },
  attachments: { hidden: false, required: false },
};

function buildSchema(cfg: TicketFormConfig) {
  const s: any = {
    buildingId: yup.string().required('Campo obrigatório.'),
  };

  const req = (x: boolean) =>
    x ? yup.string().required('Campo obrigatório.') : yup.string().optional();

  if (!cfg.residentName.hidden) s.residentName = req(cfg.residentName.required);
  if (!cfg.residentPhone.hidden) s.residentPhone = req(cfg.residentPhone.required);
  if (!cfg.residentApartment.hidden) s.residentApartment = req(cfg.residentApartment.required);
  if (!cfg.residentEmail.hidden)
    s.residentEmail = cfg.residentEmail.required
      ? yup.string().email('E-mail inválido.').required('Campo obrigatório.')
      : yup.string().email('E-mail inválido.').optional();
  if (!cfg.residentCPF.hidden) s.residentCPF = req(cfg.residentCPF.required);
  if (!cfg.description.hidden) s.description = req(cfg.description.required);
  if (!cfg.placeId.hidden) s.placeId = req(cfg.placeId.required);
  if (!cfg.types.hidden)
    s.types = cfg.types.required
      ? yup
          .array()
          .of(yup.object({ serviceTypeId: yup.string().required('Campo obrigatório.') }))
          .min(1, 'Campo obrigatório.')
          .required('Campo obrigatório.')
      : yup
          .array()
          .of(yup.object({ serviceTypeId: yup.string().optional() }))
          .optional();

  return yup.object(s).required();
}

export const ModalCreateTicket = ({
  companyId,
  buildingId,
  buildingName,
  handleCreateTicketModal,
  handleRefresh,
}: IModalCreateTicket) => {
  const [buildingsApartments, setBuildingsApartments] = useState<IBuildingApartment[]>([]);
  const [places, setPlaces] = useState<(IAuxiliaryData & { companyId?: string | null })[]>([]);
  const [types, setTypes] = useState<(IAuxiliaryData & { companyId?: string | null })[]>([]);

  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [onImageQuery, setOnImageQuery] = useState<boolean>(false);
  const [imagesToUploadCount, setImagesToUploadCount] = useState<number>(0);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [formConfig, setFormConfig] = useState<TicketFormConfig>(defaultConfig);
  const { loadConfig } = useTicketFormConfigApi(companyId);

  const ticketOptionsService = new TicketOptionsService(companyId);

  const getAuxiliaryData = async () => {
    try {
      const [places, types] = await Promise.all([
        ticketOptionsService.listPlaces(),
        ticketOptionsService.listServiceTypes(),
      ]);
      setPlaces(places);
      setTypes(types.map((x) => ({ id: x.id, label: x.singularLabel, companyId: x.companyId })));
    } catch (err) {
      catchHandler(err);
    }
  };

  const placesHook = useOptimisticSelect<IAuxiliaryData & { companyId?: string | null }>(
    (places || []).map((p) => ({ id: p.id, label: p.label, companyId: p.companyId })),
  );
  const typesHook = useOptimisticSelect<IAuxiliaryData & { companyId?: string | null }>(
    (types || []).map((t: any) => ({
      id: t.id,
      label: t.label ?? t.singularLabel,
      companyId: t.companyId,
    })),
  );

  const handleGetBuildingsApartmentsById = async () => {
    try {
      const responseData = await getBuildingsApartmentsById({ buildingId });

      setBuildingsApartments(responseData.buildingApartments);
    } catch (error: any) {
      handleToastify(error.response);
    }
  };

  useEffect(() => {
    loadConfig()
      .then((data) => setFormConfig({ ...defaultConfig, ...data }))
      .catch(() => setFormConfig(defaultConfig));
  }, []);

  const submitForm = async (values: any) => {
    setOnQuery(false);

    const schema = buildSchema(formConfig);
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err) {
      setOnQuery(false);
      return;
    }

    await Api.post(`/tickets`, {
      ...values,
      residentCPF: unMask(values.residentCPF),
      residentPhone: unMask(values.residentPhone),
      residentEmail: values.residentEmail.toLowerCase(),
      images,
    })
      .then((res) => {
        toast.success(res.data.ServerMessage.message);
        handleCreateTicketModal(false);

        if (handleRefresh) {
          handleRefresh();
        }
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  useEffect(() => {
    getAuxiliaryData();
    handleGetBuildingsApartmentsById();
  }, []);

  return (
    <Modal setModal={handleCreateTicketModal} title="Abrir novo chamado">
      <Style.Container>
        <Formik
          initialValues={{
            buildingId,
            residentName: '',
            residentPhone: '',
            residentApartment: '',
            residentEmail: '',
            residentCPF: '',
            description: '',
            placeId: '',
            types: [],
          }}
          validationSchema={buildSchema(formConfig)}
          onSubmit={submitForm}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Input
                name="buildingName"
                label="Edificação *"
                defaultValue={buildingName}
                disabled
              />

              {!formConfig.residentApartment.hidden &&
                (buildingsApartments.length > 0 ? (
                  <FormikSelect
                    name="residentApartment"
                    label={`Apartamento do morador ${formConfig.residentApartment.required ? '*' : ''}`}
                    selectPlaceholderValue={values.residentApartment}
                    error={touched.residentApartment && (errors.residentApartment || null)}
                  >
                    <option value="" disabled hidden>
                      Selecione
                    </option>

                    {buildingsApartments.map(({ id, number }) => (
                      <option value={number} key={id}>
                        {number}
                      </option>
                    ))}
                  </FormikSelect>
                ) : (
                  <FormikInput
                    name="residentApartment"
                    label={`Apartamento do morador ${formConfig.residentApartment.required ? '*' : ''}`}
                    placeholder="Ex: Informe o apartamento"
                    disabled={!values.buildingId}
                    error={touched.residentName && (errors.residentName || null)}
                  />
                ))}

              {!formConfig.residentName.hidden && (
                <FormikInput
                  name="residentName"
                  label={`Nome do morador ${formConfig.residentName.required ? '*' : ''}`}
                  placeholder="Ex: Informe o nome"
                  error={touched.residentName && (errors.residentName || null)}
                />
              )}

              {!formConfig.residentPhone.hidden && (
                <FormikInput
                  label="Telefone do morador *"
                  name="residentPhone"
                  maxLength={
                    applyMask({
                      value: values.residentPhone,
                      mask: 'TEL',
                    }).length || 1
                  }
                  value={applyMask({ value: values.residentPhone, mask: 'TEL' }).value}
                  error={
                    touched.residentPhone && errors.residentPhone ? errors.residentPhone : null
                  }
                  placeholder="Ex: (00) 00000-0000"
                  onChange={(e) => {
                    setFieldValue('residentPhone', e.target.value);
                  }}
                />
              )}

              {!formConfig.residentCPF.hidden && (
                <FormikInput
                  label="CPF do morador *"
                  name="residentCPF"
                  placeholder="Ex: 000.000.000-00"
                  value={applyMask({ mask: 'CPF', value: values.residentCPF }).value}
                  error={touched.residentCPF && (errors.residentCPF || null)}
                  disabled={!values.buildingId}
                  maxLength={
                    applyMask({
                      mask: 'CPF',
                      value: values.residentCPF,
                    }).length || 1
                  }
                  onChange={(e) => setFieldValue('residentCPF', e.target.value)}
                />
              )}

              {!formConfig.residentEmail.hidden && (
                <FormikInput
                  name="residentEmail"
                  label={`E-mail do morador ${formConfig.residentEmail.required ? '*' : ''}`}
                  placeholder="Ex: Informe o e-mail"
                  error={touched.residentEmail && (errors.residentEmail || null)}
                />
              )}

              {!formConfig.placeId.hidden && (
                <CreatableSelectField
                  label={`Local da ocorrência ${formConfig.placeId.required ? '*' : ''}`}
                  valueIds={values.placeId || null}
                  options={placesHook.merged}
                  onChangeIds={(id) => setFieldValue('placeId', id || '')}
                  onCreate={async (input) => {
                    const created = await ticketOptionsService.createPlace(input);
                    placesHook.markAdded({
                      id: created.id,
                      label: created.label,
                      companyId: created.companyId,
                    });
                    setFieldValue('placeId', created.id);
                  }}
                />
              )}

              {!formConfig.types.hidden && (
                <CreatableSelectField
                  label={`Tipo da assistência ${formConfig.types.required ? '*' : ''}`}
                  isMulti
                  valueIds={(values.types || []).map((t: any) => t.serviceTypeId)}
                  options={typesHook.merged}
                  onChangeIds={(ids) => {
                    const arr = Array.isArray(ids) ? ids : [];
                    setFieldValue(
                      'types',
                      arr.map((id) => ({ serviceTypeId: id })),
                    );
                  }}
                  onCreate={async (input) => {
                    const created = await ticketOptionsService.createServiceType(input);
                    typesHook.markAdded({
                      id: created.id,
                      label: created.singularLabel,
                      companyId: created.companyId,
                    });
                    setFieldValue('types', [...values.types, { serviceTypeId: created.id }]);
                  }}
                />
              )}

              {!formConfig.description.hidden && (
                <FormikTextArea
                  label={`Descrição ${formConfig.description.required ? '*' : ''}`}
                  placeholder="Informe a descrição"
                  name="description"
                  error={touched.description && (errors.description || null)}
                />
              )}

              <Style.Row>
                <h6>Anexos</h6>
                <Style.FileAndImageRow>
                  <DragAndDropFiles
                    disabled={onImageQuery}
                    width="132px"
                    height="136px"
                    getAcceptedFiles={async ({ acceptedFiles }) => {
                      setImagesToUploadCount(acceptedFiles.length);
                      setOnImageQuery(true);
                      const uploadedFiles = await uploadManyFiles(acceptedFiles);
                      setOnImageQuery(false);
                      setImagesToUploadCount(0);

                      const formattedUploadedFiles = uploadedFiles.map(
                        ({ Location, originalname }) => ({
                          name: originalname,
                          url: Location,
                        }),
                      );

                      setImages((prev) => [...prev, ...formattedUploadedFiles]);
                    }}
                  />
                  {images.length > 0 &&
                    images.map((image: { name: string; url: string }, index: number) => {
                      if (isImage(image.url)) {
                        return (
                          <ImagePreview
                            key={image.url}
                            src={image.url}
                            downloadUrl={image.url}
                            imageCustomName={image.name}
                            width="132px"
                            height="136px"
                            onTrashClick={() => {
                              setImages((prev) => {
                                const newState = [...prev];
                                newState.splice(index, 1);
                                return newState;
                              });
                            }}
                          />
                        );
                      }

                      return (
                        <ListTag
                          downloadUrl={image.url}
                          key={image.url}
                          padding="4px 12px"
                          label={image.name}
                          maxWidth="100px"
                          onClick={() => {
                            setImages((prev) => {
                              const newState = [...prev];
                              newState.splice(index, 1);
                              return newState;
                            });
                          }}
                        />
                      );
                    })}

                  {onImageQuery &&
                    [...Array(imagesToUploadCount).keys()].map((e) => (
                      <Style.ImageLoadingTag key={e}>
                        <DotLoading />
                      </Style.ImageLoadingTag>
                    ))}
                </Style.FileAndImageRow>
              </Style.Row>

              <Button
                center
                label="Cadastrar"
                type="submit"
                loading={onQuery}
                disable={onImageQuery}
              />
            </Form>
          )}
        </Formik>
      </Style.Container>
    </Modal>
  );
};
