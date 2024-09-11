import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Button } from '../../../components/Buttons/Button';
import { DragAndDropFiles } from '../../../components/DragAndDropFiles';
import { FormikInput } from '../../../components/Form/FormikInput';
import { ImageComponent } from '../../../components/ImageComponent';
import { Modal } from '../../../components/Modal';
import { Api } from '../../../services/api';
import { catchHandler, uploadFile } from '../../../utils/functions';

interface IModalAddBanner {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onThenRequest: () => Promise<void>;
}

const schema = yup
  .object({
    originalName: yup.string().required('Campo obrigatório.'),
    redirectUrl: yup.string().nullable(),
    buildingNanoId: yup.string().required(),
    url: yup.string().required('Campo obrigatório.'),
  })
  .required();

type TFormData = yup.InferType<typeof schema>;

export const ModalAddBanner = ({ setModal, onThenRequest }: IModalAddBanner) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [onFileQuery, setOnFileQuery] = useState<boolean>(false);

  return (
    <Modal setModal={setModal} title="Adicionar banner">
      <Formik
        initialValues={{ originalName: '', redirectUrl: '', url: '', buildingNanoId }}
        validationSchema={schema}
        onSubmit={async (values: TFormData) => {
          const { redirectUrl } = values;

          if (
            redirectUrl &&
            !redirectUrl.startsWith('www.') &&
            !redirectUrl.startsWith('https://') &&
            !redirectUrl.startsWith('http://') &&
            !redirectUrl.startsWith('//')
          ) {
            toast.error(
              <div>
                Informe um link válido.
                <br />
                Ex: www.easyalert.com.br
              </div>,
            );
            return;
          }

          // eslint-disable-next-line no-nested-ternary
          const formattedRedirectUrl = redirectUrl
            ? redirectUrl.startsWith('https://') || redirectUrl.startsWith('http://')
              ? redirectUrl
              : `https://${redirectUrl}`
            : '';

          setOnQuery(true);

          await Api.post(`/buildings/banners/create`, {
            ...values,
            redirectUrl: formattedRedirectUrl,
          })
            .then((res) => {
              setModal(false);
              onThenRequest();
              toast.success(res.data.ServerMessage.message);
            })
            .catch((err) => {
              catchHandler(err);
            });

          setOnQuery(false);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <FormikInput
              name="redirectUrl"
              label="Link do banner"
              placeholder="Ex: www.easyalert.com.br"
              error={touched.redirectUrl && (errors.redirectUrl || null)}
            />

            <DragAndDropFiles
              loading={onFileQuery}
              error={touched.url && (errors.url || null)}
              showMessage
              multiple={false}
              onlyImages
              label="Banner *"
              getAcceptedFiles={async ({ acceptedFiles }) => {
                setOnFileQuery(true);
                setFieldValue('url', '');
                const { Location, originalname } = await uploadFile(acceptedFiles[0]);
                setOnFileQuery(false);

                setFieldValue('url', Location);
                setFieldValue('originalName', originalname);
              }}
            />

            {values.url && <ImageComponent src={values.url} width="100%" height="200px" />}

            <Button
              style={{ marginTop: '8px' }}
              center
              disable={onFileQuery}
              label="Cadastrar"
              type="submit"
              loading={onQuery}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
