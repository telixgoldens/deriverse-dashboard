import React from "react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({
  currentView,
  setView,
  walletConnected,
  connectWallet,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const { theme } = useTheme(); // We ignore toggleTheme/isDarkMode. Deriverse is strictly Dark.

  const menuItems = [
    { id: "dashboard", label: "Terminal", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" },
    { id: "watchlist", label: "Market Watch", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "swap", label: "Execution", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
    { id: "activity", label: "Ledger", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "reports", label: "Analytics", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B0E11] border-r border-[#2A2F3A] transition-transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* LOGO AREA */}
          <div className="mb-10 flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-black text-white italic">
                D
             </div>
             <h1 className="text-xl font-black text-white tracking-tighter italic uppercase">
                Deriverse
             </h1>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setSidebarOpen(false);
                }}
                className={`group relative flex items-center w-full p-3 pl-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  currentView === item.id
                    ? "bg-[#151921] text-white"
                    : "text-gray-500 hover:text-[#00f0ff] hover:bg-[#151921]/50"
                }`}
              >
                {/* Active Indicator Line */}
                {currentView === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
                )}
                
                <svg
                  className={`w-5 h-5 mr-4 transition-colors ${currentView === item.id ? 'text-[#00f0ff]' : 'text-gray-600 group-hover:text-[#00f0ff]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>

          {/* CONNECT BUTTON */}
          <div className="pt-6 border-t border-[#2A2F3A]">
            <button
              onClick={connectWallet}
              className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                walletConnected
                  ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {walletConnected ? "Wallet Active" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;