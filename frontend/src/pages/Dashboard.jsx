import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import VisualizationMock from "../components/VisualizationMock";
import TradingJournalDrawer from "../components/TradingJournalDrawer"; 
import TokenTerminal from "../components/TokenTerminal";
import { Web3Service } from "../utils/services";
import { MOCK_HOLDINGS } from "../utils/constants";

// SOLANA MINT ADDRESSES
const TOKEN_ADDRESSES = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtkOpE72nX7KedKK8Uh",
  RAY: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"
};

const Dashboard = () => {
  const { theme } = useTheme(); // Assuming this handles light/dark, but we force Dark for Deriverse
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // State
  const [portfolio] = useState(MOCK_HOLDINGS);
  const [walletConnected, setWalletConnected] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // Swap State
  const [swapAmount, setSwapAmount] = useState("");
  const [selectedFromToken, setSelectedFromToken] = useState(TOKEN_ADDRESSES.SOL);
  const [selectedToToken, setSelectedToToken] = useState(TOKEN_ADDRESSES.USDC);
  const [isSwapping, setIsSwapping] = useState(false);
  
  // Journal State
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
const [terminalToken, setTerminalToken] = useState(null);
  // METRICS ENGINE
  const traderMetrics = useMemo(() => {
    const totalValue = portfolio.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0);
    const costBasis = portfolio.reduce((sum, item) => sum + item.quantity * item.purchasePrice, 0);
    const pnl = totalValue - costBasis;
    
    return {
      totalValue,
      pnl,
      pnlPercent: costBasis > 0 ? (pnl / costBasis) * 100 : 0,
      winRate: pnl >= 0 ? 68.5 : 42.1,
      profitFactor: pnl >= 0 ? 2.4 : 0.8,
      totalFees: 4.20
    };
  }, [portfolio]);

  const handleConnectWallet = async () => {
    try {
      const { address } = await Web3Service.connectWallet(); 
      setWalletConnected(true);
    } catch (e) { console.error(e); }
  };

  const handleSwap = async () => {
    if (!walletConnected) return alert("Connect Solana Wallet first");
    setIsSwapping(true);
    setTimeout(() => {
        setIsSwapping(false);
        setSwapAmount("");
        alert("Deriverse Order Filled. \nTX: 5KTn...92x");
    }, 2000);
  };

  // --- RENDERERS ---

  const renderDashboard = () => (
    <div className="space-y-6 text-white">
      {/* 1. HERO METRICS (Cyber-Deck Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Equity Card */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A] shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <svg className="w-16 h-16 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Net Liquidation Value</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white tracking-tight">
                    ${traderMetrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
            </div>
            <div className={`text-xs font-bold mt-2 flex items-center gap-1 ${traderMetrics.pnl >= 0 ? 'text-[#00f0ff]' : 'text-red-500'}`}>
                {traderMetrics.pnl >= 0 ? '▲' : '▼'} {Math.abs(traderMetrics.pnlPercent).toFixed(2)}% (24h)
            </div>
        </div>

        {/* Win Rate (The Bar) */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Win Rate (30d)</h3>
            <span className={`text-3xl font-black ${traderMetrics.winRate > 50 ? 'text-[#00f0ff]' : 'text-red-500'}`}>
                {traderMetrics.winRate}%
            </span>
            <div className="w-full bg-[#0B0E11] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#00f0ff] h-full shadow-[0_0_10px_#00f0ff]" style={{ width: `${traderMetrics.winRate}%` }}></div>
            </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Profit Factor</h3>
            <span className="text-3xl font-black text-white">{traderMetrics.profitFactor}<span className="text-lg text-gray-600">x</span></span>
            <p className="text-[10px] text-gray-500 mt-2 font-mono">GROSS WIN / GROSS LOSS</p>
        </div>

        {/* Fees */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Fees Paid</h3>
            <span className="text-3xl font-black text-purple-400">${traderMetrics.totalFees.toFixed(2)}</span>
            <p className="text-[10px] text-gray-500 mt-2 font-mono">SOLANA MAINNET</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-[#151921] rounded-2xl border border-[#2A2F3A] p-1">
             {/* Pass dark theme props to your chart mock */}
            <VisualizationMock metrics={traderMetrics} theme="deriverse" />
        </div>

        {/* AI Insight Widget (Sauron Eye) - UPDATED STYLE */}
        <div className="bg-gradient-to-b from-[#151921] to-[#0B0E11] p-6 rounded-2xl border border-[#2A2F3A] flex flex-col justify-between relative overflow-hidden">
             {/* Decorative Gradient Blob */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>
             
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-black text-white italic tracking-widest flex items-center gap-2">
                        <span className="text-purple-500">◈</span> SAURON AI
                    </h2>
                    <div className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[9px] text-green-400 font-mono animate-pulse">
                        ONLINE
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#0B0E11]/80 p-4 rounded-xl border-l-2 border-[#00f0ff] backdrop-blur-sm">
                        <p className="text-[9px] text-[#00f0ff] font-bold uppercase mb-1 tracking-wider">Anomaly Detected</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">
                            Market depth on <span className="text-white">JUP-PERP</span> is thinning. High slippage risk (+2.4%) detected for orders $10k.
                        </p>
                    </div>
                    <div className="bg-[#0B0E11]/80 p-4 rounded-xl border-l-2 border-purple-500 backdrop-blur-sm">
                        <p className="text-[9px] text-purple-400 font-bold uppercase mb-1 tracking-wider">Performance Tip</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">
                            You are over-trading during <span className="text-white">Asian Session</span>. Win rate drops by 12%.
                        </p>
                    </div>
                </div>
             </div>
             <button onClick={() => setView('reports')} className="mt-6 w-full py-3 bg-[#1A1F2A] hover:bg-[#252B36] border border-white/5 text-white text-[10px] font-black rounded-lg transition uppercase tracking-widest flex items-center justify-center gap-2 group">
                Run Deep Diagnostic <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
        </div>
      </div>

      {/* TRADE HISTORY TABLE - UPDATED STYLE */}
      <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em]">
                Active Positions & History
            </h2>
            <div className="flex gap-2">
                <button className="text-[10px] bg-[#0B0E11] border border-[#2A2F3A] px-3 py-1 rounded text-white hover:border-[#00f0ff] transition">ALL</button>
                <button className="text-[10px] bg-[#0B0E11] border border-[#2A2F3A] px-3 py-1 rounded text-gray-500 hover:text-white transition">PERPS</button>
            </div>
        </div>
       
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-bold">
            <thead className="text-gray-500 border-b border-[#2A2F3A] uppercase font-mono">
              <tr>
                <th className="pb-4 px-4">Instrument</th>
                <th className="pb-4 px-4">Side</th>
                <th className="pb-4 px-4 text-right">Size (USD)</th>
                <th className="pb-4 px-4 text-right">PnL</th>
                <th className="pb-4 px-4 text-right">Journal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2F3A]">
              {portfolio.map((h, i) => (
                <tr
                  key={h.id || i}
                  onClick={() => { setTerminalToken(h)}}
                  className="hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#2A2F3A] flex items-center justify-center text-[10px] text-gray-400 border border-white/5">
                        {h.symbol.substring(0,2)}
                    </div>
                    {h.symbol}-PERP
                  </td>
                  <td className="py-4 px-4">
                      <span className="text-[9px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 uppercase tracking-wider">Long 10x</span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300 font-mono">
                    ${(h.quantity * (h.price || 0)).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-[#00f0ff] font-mono shadow-cyan-500/50">
                    +$124.50
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-[18px] text-gray-600 group-hover:text-white transition">
                        ✎
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-screen bg-[#0B0E11] text-gray-200 font-sans selection:bg-cyan-500/30">
        {terminalToken && (
    <TokenTerminal 
        token={terminalToken} 
        onClose={() => setTerminalToken(null)} 
    />
)}
      <TradingJournalDrawer 
        isOpen={isJournalOpen} 
        onClose={() => setIsJournalOpen(false)} 
        trade={selectedTrade} 
      />

      {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}
      
      <Sidebar
        currentView={view}
        setView={setView}
        walletConnected={walletConnected}
        connectWallet={handleConnectWallet}
        isSidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="flex-1 p-4 overflow-y-auto lg:ml-64 md:p-8 relative">
          {/* Subtle Background Glow for that "Deriverse" feel */}
         <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none z-0" />
         
         <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 lg:hidden">
                <button onClick={() => setSidebarOpen(true)} className="p-2 rounded text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            {view === "dashboard" && renderDashboard()}
            
            {view === "swap" && (
                // Quick inline swap render to save space, keeping the neon theme
                <div className="max-w-xl mx-auto pt-10">
                    <div className="bg-[#151921] p-8 rounded-[30px] border border-[#2A2F3A] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"></div>
                        <h2 className="text-3xl font-black text-white italic mb-8">DERIVERSE SWAP</h2>
                        <div className="space-y-4">
                             <div className="bg-[#0B0E11] p-4 rounded-xl border border-[#2A2F3A]">
                                <label className="text-[10px] text-gray-500 font-bold uppercase">Pay</label>
                                <input className="w-full bg-transparent text-2xl font-black text-white outline-none mt-2" placeholder="0.00" value={swapAmount} onChange={e=>setSwapAmount(e.target.value)} />
                             </div>
                             <button onClick={handleSwap} className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black italic rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition transform active:scale-95 uppercase tracking-widest">
                                {isSwapping ? "Executing..." : "Swap Assets"}
                             </button>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </main>
    </div>
  );
};

export default Dashboard;