import React, { useState, useEffect } from "react";
import { MenuIcon, Search, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex justify-center w-full bg-[#1f2937]/85 backdrop-blur-xl shadow-lg border-b border-gray-700/50">
      <header className="flex items-center justify-between w-full max-w-[1200px] px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Conditional rendering based on auth status */}
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="icon"
              className="
                group
                rounded-full p-2.5
                bg-transparent hover:bg-green-500/15
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937]
                transition-all duration-200 ease-in-out
              "
            >
              <MenuIcon className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" />
            </Button>
          ) : (
            <Button
    variant="default"
    size="sm"
    className="
      relative overflow-hidden
      text-white font-medium
      bg-green-600
      hover:bg-green-400
      border border-green-600/30
      shadow-md shadow-green-900/20
      px-4 py-2 rounded-full
      transform transition-all duration-200
      hover:scale-105 hover:shadow-lg hover:shadow-green-900/30
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500
    "
    onClick={() => navigate('/landing')}
  >
    <span className="flex items-center gap-1.5">
      <LogIn className="h-4 w-4" />
      <span>Login / Signup</span>
    </span>
  </Button>
          )}

          <h1 className="text-gray-100 font-semibold text-2xl tracking-wider">
            PSG EVENTS
          </h1>
        </div>

        {/* Search button remains the same */}
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="
              group
              rounded-full p-2.5
              bg-transparent hover:bg-green-500/15
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937]
              transition-all duration-200 ease-in-out
            "
          >
            <Search className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;