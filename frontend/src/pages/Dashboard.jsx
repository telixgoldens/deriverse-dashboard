import React, { useState, useMemo, useEffect } from "react";
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
  JUP: "JUPyiwrYJFskUPiHa7hkeR8VUtkOpE72nX7KedKK8Uh"
};

const Dashboard = () => {
  const { theme } = useTheme();
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // CORE STATE
  const [portfolio] = useState(MOCK_HOLDINGS);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  
  // FILTERS (Required by Deriverse)
  const [dateRange, setDateRange] = useState("30D"); // 1D, 7D, 30D, ALL
  const [symbolFilter, setSymbolFilter] = useState("ALL");

  // INTERACTION STATE
  const [swapAmount, setSwapAmount] = useState("");
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [terminalToken, setTerminalToken] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
        setWalletConnected(true); 
        const { address } = await Web3Service.connectWallet();
        setWalletAddress(address);
    };
    checkConnection();
  }, []);

  // --- ANALYTICS ENGINE (The Brain) ---
  const traderMetrics = useMemo(() => {
    // 1. Basic PnL
    const totalValue = portfolio.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0);
    const costBasis = portfolio.reduce((sum, item) => sum + item.quantity * item.entryPrice, 0);
    const pnl = totalValue - costBasis;
    
    // 2. Advanced Stats (Deriverse Requirements)
    // In a real app, calculate these from a transaction history array. Here we mock logic based on portfolio.
    const winRate = pnl >= 0 ? 64.2 : 41.5; 
    const avgDuration = "4h 12m"; // Mocked for demo
    
    // Long/Short Ratio Logic
    const longCount = portfolio.filter(p => p.side === 'long').length;
    const shortCount = portfolio.filter(p => p.side === 'short').length;
    const totalCount = longCount + shortCount || 1;
    const longPercentage = Math.round((longCount / totalCount) * 100);

    return {
      totalValue,
      pnl,
      pnlPercent: costBasis > 0 ? (pnl / costBasis) * 100 : 0,
      winRate,
      profitFactor: pnl >= 0 ? 2.4 : 0.8,
      totalFees: 12.50,
      feeBreakdown: { network: 4.20, swap: 8.30 }, // Breakdown required
      avgDuration,
      longShortRatio: { long: longPercentage, short: 100 - longPercentage },
      bestTrade: { symbol: 'SOL', amount: 420 }, // Largest Gain
      worstTrade: { symbol: 'WIF', amount: -150 } // Largest Loss
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

  const renderDashboard = () => (
    <div className="space-y-6 text-white animate-in fade-in duration-500">
      
      {/* 0. FILTER BAR (New) */}
      <div className="flex justify-between items-center bg-[#151921] p-2 rounded-xl border border-[#2A2F3A]">
        <div className="flex gap-2">
            {['1D', '7D', '30D', 'ALL'].map(range => (
                <button 
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition ${dateRange === range ? 'bg-[#00f0ff] text-black' : 'text-gray-500 hover:text-white'}`}
                >
                    {range}
                </button>
            ))}
        </div>
        <div className="flex gap-4 px-4 text-[10px] font-mono text-gray-500">
             <span>SESSION: <span className="text-[#00ff9d]">NY OPEN</span></span>
             <span>GAS: <span className="text-purple-400">12 GWEI</span></span>
        </div>
      </div>

      {/* 1. HERO METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Net Worth */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A] shadow-lg relative overflow-hidden group hover:border-[#00f0ff]/30 transition">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Net Liquidation</h3>
            <span className="text-3xl font-black text-white tracking-tight">
                ${traderMetrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <div className={`text-xs font-bold mt-2 ${traderMetrics.pnl >= 0 ? 'text-[#00ff9d]' : 'text-red-500'}`}>
                {traderMetrics.pnl >= 0 ? '+' : ''}{traderMetrics.pnlPercent.toFixed(2)}%
            </div>
        </div>

        {/* Win Rate */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Win Rate</h3>
            <span className={`text-3xl font-black ${traderMetrics.winRate > 50 ? 'text-[#00f0ff]' : 'text-red-500'}`}>
                {traderMetrics.winRate}%
            </span>
            <div className="w-full bg-[#0B0E11] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#00f0ff] h-full shadow-[0_0_10px_#00f0ff]" style={{ width: `${traderMetrics.winRate}%` }}></div>
            </div>
        </div>

        {/* Long/Short Ratio (New) */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Long / Short Bias</h3>
            <div className="flex justify-between items-end mb-2">
                <span className="text-xl font-black text-green-400">{traderMetrics.longShortRatio.long}%</span>
                <span className="text-xl font-black text-red-400">{traderMetrics.longShortRatio.short}%</span>
            </div>
            <div className="flex w-full h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: `${traderMetrics.longShortRatio.long}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${traderMetrics.longShortRatio.short}%` }}></div>
            </div>
        </div>

        {/* Risk Stats (New) */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-[#2A2F3A] pb-2">
                <span className="text-[9px] font-black text-gray-500 uppercase">Avg Duration</span>
                <span className="text-sm font-mono font-bold text-white">{traderMetrics.avgDuration}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] font-black text-gray-500 uppercase">Best Trade</span>
                <span className="text-sm font-mono font-bold text-green-400">+${traderMetrics.bestTrade.amount}</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#151921] rounded-2xl border border-[#2A2F3A] p-1 h-[350px]">
            <VisualizationMock metrics={traderMetrics} theme="deriverse" />
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-b from-[#151921] to-[#0B0E11] p-6 rounded-2xl border border-[#2A2F3A] flex flex-col justify-between relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>
             
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm font-black text-white italic tracking-widest flex items-center gap-2">
                        <span className="text-purple-500">◈</span> SAURON AI
                    </h2>
                    <div className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[9px] text-green-400 font-mono animate-pulse">ONLINE</div>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#0B0E11]/80 p-4 rounded-xl border-l-2 border-[#00f0ff] backdrop-blur-sm">
                        <p className="text-[9px] text-[#00f0ff] font-bold uppercase mb-1 tracking-wider">Fee Analysis</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">
                            Total Fees: <span className="text-white">${traderMetrics.totalFees}</span>. 
                            Breakdown: ${traderMetrics.feeBreakdown.network} (Net) / ${traderMetrics.feeBreakdown.swap} (Swap).
                        </p>
                    </div>
                    <div className="bg-[#0B0E11]/80 p-4 rounded-xl border-l-2 border-purple-500 backdrop-blur-sm">
                        <p className="text-[9px] text-purple-400 font-bold uppercase mb-1 tracking-wider">Drawdown Warning</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-medium">
                            Max drawdown of <span className="text-red-400">-4.2%</span> detected on JUP shorts. Adjust stop-loss.
                        </p>
                    </div>
                </div>
             </div>
             <button className="mt-6 w-full py-3 bg-[#1A1F2A] hover:bg-[#252B36] border border-white/5 text-white text-[10px] font-black rounded-lg transition uppercase tracking-widest flex items-center justify-center gap-2 group">
                Full Diagnosis <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
        </div>
      </div>

      {/* TRADE HISTORY */}
      <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
        <div className="flex justify-between items-center mb-6">
             <h2 className="text-xs font-black uppercase text-gray-400 tracking-[0.2em]">Active Positions</h2>
             <div className="flex gap-2">
                <button 
                    onClick={() => setSymbolFilter("ALL")}
                    className={`text-[10px] border px-3 py-1 rounded transition ${symbolFilter === "ALL" ? 'bg-[#00f0ff] text-black border-[#00f0ff]' : 'bg-[#0B0E11] text-gray-500 border-[#2A2F3A]'}`}
                >
                    ALL
                </button>
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
                  onClick={() => setTerminalToken(h)}
                  className="hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#2A2F3A] flex items-center justify-center text-[10px] text-gray-400 border border-white/5">
                        {h.symbol.substring(0,2)}
                    </div>
                    {h.symbol}-PERP
                  </td>
                  <td className="py-4 px-4">
                      <span className={`text-[9px] px-2 py-1 rounded border uppercase tracking-wider ${h.side === 'long' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {h.side} {h.leverage}x
                      </span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300 font-mono">
                    ${(h.quantity * (h.price || 0)).toLocaleString()}
                  </td>
                  <td className={`py-4 px-4 text-right font-mono font-black ${h.pnl >= 0 ? 'text-[#00f0ff] shadow-cyan-500/50' : 'text-red-500'}`}>
                    {h.pnl >= 0 ? '+' : ''}${h.pnl}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTrade(h);
                            setIsJournalOpen(true);
                        }}
                        className="text-[18px] text-gray-600 group-hover:text-white transition"
                    >
                        ✎
                    </button>
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
        <TokenTerminal token={terminalToken} onClose={() => setTerminalToken(null)} />
      )}
      <TradingJournalDrawer isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} trade={selectedTrade} />
      {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}
      <Sidebar currentView={view} setView={setView} walletConnected={walletConnected} connectWallet={handleConnectWallet} isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 p-4 overflow-y-auto lg:ml-64 md:p-8 relative">
          <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none z-0" />
          <div className="relative z-10">
             <div className="flex items-center justify-between mb-6 lg:hidden">
                <button onClick={() => setSidebarOpen(true)} className="p-2 rounded text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
             </div>

            {view === "dashboard" && renderDashboard()}
            
            {/* INLINE SWAP FOR DASHBOARD VIEW (Can be separated if needed) */}
            {view === "swap" && (
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