import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Deriverse is strictly Dark Mode (Cyber-Fi)
  const theme = {
    mode: "dark",
    bgPrimary: "bg-[#0B0E11]",    // Deep Navy/Black
    bgSecondary: "bg-[#151921]",  // Panel Background
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    accentCyan: "text-[#00f0ff]",
    accentPurple: "text-[#9945FF]",
    border: "border-[#2A2F3A]",   // Subtle Tech Border
    success: "text-[#00ff9d]",    // Cyber Green
    error: "text-[#ff0055]",      // Cyber Red
    glow: "shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);