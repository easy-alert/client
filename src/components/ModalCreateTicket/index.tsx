// REACT
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// COMPONENTS
import * as yup from 'yup';
import { Formik, Form } from 'formik';

// SERVICES
import { Api } from '@services/api';
import { getBuildingsApartmentsById } from '@services/apis/getBuildingsApartmentsById';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';
import { Input } from '@components/Inputs/Input';
import { FormikTextArea } from '@components/Form/FormikTextArea';
import { DragAndDropFiles } from '@components/DragAndDropFiles';
import { ImagePreview } from '@components/ImagePreview';
import { DotLoading } from '@components/Loadings/DotLoading';
import { FormikSelect } from '@components/Form/FormikSelect';
import { ReactSelectComponent } from '@components/ReactSelectComponent';
import { ListTag } from '@components/ListTag';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// GLOBAL TYPES
import { IBuildingApartment } from '@customTypes/IBuildingApartments';

// GLOBAL UTILS
import { applyMask, catchHandler, isImage, unMask, uploadManyFiles } from '@utils/functions';

// STYLES
import * as Style from './styles';

interface IModalCreateTicket {
  buildingId: string;
  buildingName: string;
  handleCreateTicketModal: (modal: boolean) => void;
  handleRefresh?: () => void;
}

interface IAuxiliaryData {
  id: string;
  label: string;
}

const schema = yup
  .object({
    buildingId: yup.string().required('Campo obrigatório.'),
    residentName: yup.string().required('Campo obrigatório.'),
    residentPhone: yup.string().required('Campo obrigatório.'),
    residentApartment: yup.string().required('Campo obrigatório.'),
    residentEmail: yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
    residentCPF: yup.string().required('Campo obrigatório.'),
    description: yup.string().required('Campo obrigatório.'),
    placeId: yup.string().required('Campo obrigatório.'),
    types: yup
      .array()
      .of(
        yup.object({
          serviceTypeId: yup.string().required('Campo obrigatório.'),
        }),
      )
      .min(1, 'Campo obrigatório.')
      .required('Campo obrigatório.'),
  })
  .required();

type TSchema = yup.InferType<typeof schema>;

export const ModalCreateTicket = ({
  buildingId,
  buildingName,
  handleCreateTicketModal,
  handleRefresh,
}: IModalCreateTicket) => {
  const [buildingsApartments, setBuildingsApartments] = useState<IBuildingApartment[]>([]);
  const [places, setPlaces] = useState<IAuxiliaryData[]>([]);
  const [types, setTypes] = useState<IAuxiliaryData[]>([]);

  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [onImageQuery, setOnImageQuery] = useState<boolean>(false);
  const [imagesToUploadCount, setImagesToUploadCount] = useState<number>(0);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);

  const getAuxiliaryData = async () => {
    await Api.get(`/tickets/extras/auxiliary-data`)
      .then((res) => {
        setPlaces(res.data.places);
        setTypes(res.data.types);
      })
      .catch((err) => {
        catchHandler(err);
      });
  };

  const handleGetBuildingsApartmentsById = async () => {
    try {
      const responseData = await getBuildingsApartmentsById({ buildingId });

      setBuildingsApartments(responseData.buildingApartments);
    } catch (error: any) {
      handleToastify(error.response);
    }
  };

  const submitForm = async (values: TSchema) => {
    setOnQuery(false);

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
          validationSchema={schema}
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

              {buildingsApartments.length > 0 ? (
                <FormikSelect
                  name="residentApartment"
                  label="Apartamento do morador *"
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
                  label="Apartamento do morador *"
                  placeholder="Ex: Informe o apartamento"
                  disabled={!values.buildingId}
                  error={touched.residentName && (errors.residentName || null)}
                />
              )}

              <FormikInput
                name="residentName"
                label="Nome do morador *"
                placeholder="Ex: Informe o nome"
                error={touched.residentName && (errors.residentName || null)}
              />

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
                error={touched.residentPhone && errors.residentPhone ? errors.residentPhone : null}
                placeholder="Ex: (00) 00000-0000"
                onChange={(e) => {
                  setFieldValue('residentPhone', e.target.value);
                }}
              />

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

              <FormikInput
                name="residentEmail"
                label="E-mail do morador *"
                placeholder="Ex: Informe o e-mail"
                error={touched.residentEmail && (errors.residentEmail || null)}
              />

              <FormikSelect
                name="placeId"
                selectPlaceholderValue={values.placeId}
                label="Local da ocorrência *"
                error={touched.placeId && (errors.placeId || null)}
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
                {places.map(({ id, label }) => (
                  <option value={id} key={id}>
                    {label}
                  </option>
                ))}
              </FormikSelect>

              <ReactSelectComponent
                selectPlaceholderValue={values.types.length}
                isMulti
                isClearable={false}
                label="Tipo da assistência *"
                id="1"
                name="2"
                options={types.map(({ id, label }) => ({
                  label,
                  value: id,
                }))}
                placeholder="Selecione"
                onChange={(evt) => {
                  const data = evt?.map(({ value }: { value: string }) => ({
                    serviceTypeId: value,
                  }));
                  setFieldValue('types', data);
                }}
                error={touched.types && (errors.types || null)}
              />

              <FormikTextArea
                label="Descrição *"
                placeholder="Informe a descrição"
                name="description"
                error={touched.description && (errors.description || null)}
              />

              <Style.Row>
                <h6>Anexos *</h6>
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
