import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
