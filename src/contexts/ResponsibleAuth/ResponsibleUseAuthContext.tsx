import { useContext } from 'react';
import { ResponsibleAuthContext } from './ResponsibleAuthContext';

export const ResponsibleUseAuthContext = () => {
  const authContext = useContext(ResponsibleAuthContext);

  return authContext;
};
