import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'LOADED':
      return { ...state, user: action.payload, isLoaded: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoaded: false,
  });

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth', { credentials: 'include' });
        const user = await res.json();
        dispatch({ type: 'LOADED', payload: user });
      } catch (error) {
        console.error('Could not connect to the server.');
        dispatch({ type: 'LOADED', payload: null });
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
