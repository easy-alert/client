import { ResidentAuthContext } from './ResidentAuthContext';

export const ResidentAuthProvider = ({ children }: { children: JSX.Element }) => (
  <ResidentAuthContext.Provider value={null}>{children}</ResidentAuthContext.Provider>
);
