import React, { useState, useEffect,createContext } from 'react';
import URL from '../../links';
interface AuthContextType {
  isAuthenticated: boolean;
  login: (rollNo?: string, rememberMe?: boolean) => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  // Check if the user is authenticated by checking localStorage for token
  const checkAuth = async () => {
    try {
      // Check both localStorage and sessionStorage for token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      // If token exists, consider user authenticated
      // In a production app, you might want to validate the token with the server
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);

const login = (rollNo?: string, rememberMe?: boolean) => {
  // Store authentication token based on remember me preference
  if (rememberMe) {
    // Store in localStorage for persistent sessions
    localStorage.setItem('userRollNo', rollNo || '');
  } else {
    // Store in sessionStorage for session-only storage
    sessionStorage.setItem('userRollNo', rollNo || '');
  }
  setIsAuthenticated(true);
};

const logout = async () => {
  try {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userRollNo');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRollNo');
    
    // You can still try to hit the logout endpoint if it exists
    try {
      await fetch(`${URL}/auth/user/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      // Ignore errors from the server during logout
      console.log("Error during server logout:", error);
    }
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