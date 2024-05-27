import { ResponsibleAuthContext } from './ResponsibleAuthContext';

export const ResponsibleAuthProvider = ({ children }: { children: JSX.Element }) => (
  <ResponsibleAuthContext.Provider value={null}>{children}</ResponsibleAuthContext.Provider>
);
