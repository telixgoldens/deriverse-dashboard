import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const LandingPage = ({ onConnect }) => {
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* 1. BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/deriverse-img.jpg')`, // Ensure image is in public folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-700">
        
        {/* Logo / Badge */}
        <div className="mb-8 p-px bg-gradient-to-r from-transparent via-[#2A2F3A] to-transparent w-full max-w-[200px]"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-300 uppercase">Deriverse Ecosystem</span>
        </div>

        {/* Hero Text */}
        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-6 drop-shadow-2xl">
          TRACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#9945FF]">PAD</span>
        </h1>
        
        <p className="max-w-xl text-gray-400 text-sm md:text-base font-medium leading-relaxed tracking-wide mb-12">
          Institutional-grade portfolio analytics and execution terminal built for the <strong className="text-white">Deriverse</strong> protocol.
          <br className="hidden md:block" /> Trade with Sauron AI insights. Trust nothing but the code.
        </p>

        {/* 3. CALL TO ACTION (The Gate) */}
        <button
          onClick={onConnect}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group relative px-12 py-6 bg-[#0B0E11] rounded-2xl overflow-hidden border border-[#2A2F3A] transition-all duration-300 hover:border-[#00f0ff] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]"
        >
          {/* Animated Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#9945FF] to-[#00f0ff] opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          <div className="relative flex items-center gap-4">
             <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#00f0ff] transition-colors">Initialize</span>
                <span className="text-2xl font-black text-white italic tracking-tighter uppercase">Connect Wallet</span>
             </div>
             
             {/* Arrow Icon */}
             <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300 ${isHovering ? 'translate-x-2 bg-[#00f0ff] border-[#00f0ff] text-black' : 'text-white'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </div>
          </div>
        </button>

        {/* Footer Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-20 opacity-60">
            <div className="text-center">
                <p className="text-2xl font-black text-white">2.4s</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">Latency</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">On-Chain</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-black text-white">AI</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">Powered</p>
            </div>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] via-transparent to-[#9945FF] opacity-50"></div>
    </div>
  );
};

export default LandingPage;