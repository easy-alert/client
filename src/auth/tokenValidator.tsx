// LIBS
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { Api } from '../services/api';

// COMPONENTS
import { DotLoading } from '../components/Loadings/DotLoading';

export const TokenValidator = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // const validateToken = async () => {
  //   await Api.get('rota verificar token')
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       window.open('https://easyalert.com.br/', '_self');
  //     });
  // };

  useEffect(() => {
    // validateToken();
    setLoading(false);
  }, []);

  return loading ? <DotLoading label="Verificando credenciais" /> : <Outlet />;
};
