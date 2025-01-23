import { createContext, useContext, useState } from 'react';
import { PROFILE_INITIAL_STATE } from '../constants/constants';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(PROFILE_INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
