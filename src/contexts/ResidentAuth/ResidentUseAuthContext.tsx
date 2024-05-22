import { useContext } from 'react';
import { ResidentAuthContext } from './ResidentAuthContext';

export const ResidentUseAuthContext = () => {
  const authContext = useContext(ResidentAuthContext);

  return authContext;
};
