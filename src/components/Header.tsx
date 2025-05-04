import React from "react";
import { MenuIcon, Search } from "lucide-react";
import { Button } from "./ui/button"; // Assuming this is your Button component

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#1f2937]/85 backdrop-blur-xl px-4 py-3 shadow-lg border-b border-gray-700/50"> 
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto"> 
        
        {/* Left Side: Menu and Title */}
        <div className="flex items-center gap-4"> 
          {/* Added 'group' class to the button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="
              group {/* Added group class */}
              rounded-full p-2.5 
              bg-transparent hover:bg-green-500/15 /* Subtle green background on hover */
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937] /* Custom focus ring */
              transition-all duration-200 ease-in-out /* Smooth transition */
            " 
          >
            {/* Icon is white by default, turns green on button hover */}
            <MenuIcon className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" /> 
          </Button>
          <h1 className="text-gray-100 font-semibold text-2xl tracking-wider"> 
            PSG EVENTS
          </h1>
        </div>

        {/* Right Side: Search Button */}
        {/* Added 'group' class to the button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="
            group {/* Added group class */}
            rounded-full p-2.5 
            bg-transparent hover:bg-green-500/15 /* Subtle green background on hover */
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2937] /* Custom focus ring */
            transition-all duration-200 ease-in-out /* Smooth transition */
          " 
        >
          {/* Icon is white by default, turns green on button hover */}
          <Search className="h-6 w-6 text-white group-hover:text-green-500 transition-colors duration-200" /> 
        </Button>
      </div>
    </header>
  );
};

export default Header;