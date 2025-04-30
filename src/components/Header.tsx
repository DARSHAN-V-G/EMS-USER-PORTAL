import React from "react";
import { MenuIcon, Search } from "lucide-react";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#242c3b]/90 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="p-1.5 text-white hover:bg-white/10">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-white font-bold text-xl">PSG EVENTS</h1>
        </div>
        <Button 
          variant="default" 
          size="icon" 
          className="p-2 bg-[#4CC35E] hover:bg-[#4CC35E]/90 rounded-lg"
          style={{ backgroundColor: "#4CC35E" }} // Ensure green color is applied
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </header>
  );
};

export default Header;