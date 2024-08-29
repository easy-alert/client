// LIBS
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useParams, useSearchParams } from 'react-router-dom';
import { Api } from '../../services/api';

import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';
import { IRequireAuth } from './types';
import { applyMask, catchHandler } from '../../utils/functions';
import { Button } from '../../components/Buttons/Button';
import { FullScreenModal } from '../../components/FullScreenModal';
import { FormikInput } from '../../components/Form/FormikInput';

const schema = yup
  .object({
    password: yup.string().required('Campo obrigatório'),
  })
  .required();

export const ResponsibleRequireAuth = ({ children }: IRequireAuth) => {
  const { buildingNanoId } = useParams() as { buildingNanoId: string };
  const [buildingName, setBuildingName] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [needPassword, setNeedPassword] = useState<boolean>(true);
  const [search] = useSearchParams();
  const queryPassword = search.get('password') ?? '';

  const checkPasswordExistence = async () => {
    await Api.get(`/check-password-existence/${buildingNanoId}/responsible`)
      .then((res) => {
        setNeedPassword(res.data.needPassword);
        setBuildingName(res.data.buildingName);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (password: string) => {
    setOnQuery(true);

    await Api.post('/validate-password', { password, type: 'responsible', buildingNanoId })
      .then(() => {
        setNeedPassword(false);
      })
      .catch((err) => {
        catchHandler(err);
        setNeedPassword(true);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  useEffect(() => {
    checkPasswordExistence();

    if (queryPassword) {
      signIn(queryPassword);
    }
  }, []);

  return (
    <>
      {loading && (
        <FullScreenModal title="">
          <DotSpinLoading label="Verificando credenciais" />
        </FullScreenModal>
      )}

      {!loading && needPassword && (
        <FullScreenModal title={`Acesso - Responsável ${buildingName}`}>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={schema}
            onSubmit={async (values) => {
              await signIn(values.password);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <FormikInput
                  maxLength={100}
                  passwordShowToggle
                  autoComplete="off"
                  type="password"
                  name="password"
                  label="Senha"
                  placeholder="Informe a senha"
                  error={touched.password && errors.password ? errors.password : null}
                  onChange={(evt) => {
                    setFieldValue(
                      'password',
                      applyMask({ mask: 'NUM', value: evt.target.value }).value,
                    );
                  }}
                />

                <Button
                  type="submit"
                  label="Acessar"
                  center
                  style={{ marginTop: '8px' }}
                  loading={onQuery}
                />
              </Form>
            )}
          </Formik>
        </FullScreenModal>
      )}

      {!loading && !needPassword && children}
    </>
  );
};
