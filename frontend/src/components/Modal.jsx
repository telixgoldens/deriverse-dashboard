import React from "react";
import { useTheme } from "../context/ThemeContext";

const Modal = ({ children, onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative bg-[#0B0E11] rounded-[30px] shadow-[0_0_50px_rgba(0,240,255,0.15)] max-w-lg w-full p-8 border border-[#2A2F3A] animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative Top Border */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_10px_#00f0ff]"></div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;