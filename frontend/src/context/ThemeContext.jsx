import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    mode: "dark",
    bgPrimary: "bg-[#0B0E11]",    
    bgSecondary: "bg-[#151921]",  
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    accentCyan: "text-[#00f0ff]",
    accentPurple: "text-[#9945FF]",
    border: "border-[#2A2F3A]",   
    success: "text-[#00ff9d]",    
    error: "text-[#ff0055]",      
    glow: "shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);