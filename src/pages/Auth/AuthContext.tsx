import React, { useState, useEffect,createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider  value={{ isAuthenticated, setIsAuthenticated, logout }}>
    {children}
    </AuthContext.Provider>
  );

};
function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
export { AuthProvider,useAuth };