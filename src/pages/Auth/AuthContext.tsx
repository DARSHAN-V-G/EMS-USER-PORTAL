import React, { useState, useEffect,createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  // Check if the user is authenticated by making a request to an endpoint
  // that validates their session cookie
  const checkAuth = async () => {
    try {
      const response = await fetch(`${URL}/auth/user/status`, {
        method: 'GET',
        credentials: 'include'
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);

const login = () => {
  // No need to store anything locally
  setIsAuthenticated(true);
};

const logout = async () => {
  try {
    await fetch(`${URL}/auth/user/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } finally {
    setIsAuthenticated(false);
  }
};
  return (
    <AuthContext.Provider  value={{ isAuthenticated, setIsAuthenticated, logout,login }}>
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