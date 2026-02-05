import React, { useState } from "react";

const TradingJournalDrawer = ({ isOpen, onClose, trade }) => {
  const [note, setNote] = useState("");
  const [chartLink, setChartLink] = useState("");
  const [txHash, setTxHash] = useState("");
  const [sentiment, setSentiment] = useState(null); 
  const [executionQuality, setExecutionQuality] = useState(null); 

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#0B0E11] border-l border-[#2A2F3A] shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-8 border-b border-[#2A2F3A] flex justify-between items-center bg-[#151921]">
          <div>
            <h2 className="text-3xl font-black italic text-white uppercase flex items-center gap-3">
              {trade?.symbol || "UNKNOWN"}
              <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20 font-sans font-bold tracking-widest">
                PERP
              </span>
            </h2>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-1">
              Trade Analysis Log #{trade?.id || "802"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#151921] p-5 rounded-2xl border border-[#2A2F3A]">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider mb-1">
                Entry Price
              </p>
              <p className="text-xl text-white font-mono font-bold">$124.50</p>
            </div>
            <div className="bg-[#151921] p-5 rounded-2xl border border-[#2A2F3A]">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider mb-1">
                Exit Price
              </p>
              <p className="text-xl text-white font-mono font-bold">$142.20</p>
            </div>
            <div className="col-span-2 flex gap-4">
              <div className="flex-1 bg-[#151921] p-4 rounded-xl border border-[#2A2F3A] flex justify-between items-center">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider">
                  Duration
                </span>
                <span className="text-sm text-white font-mono font-bold">
                  4h 12m 30s
                </span>
              </div>
              <div className="flex-1 bg-[#151921] p-4 rounded-xl border border-[#2A2F3A] flex justify-between items-center">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider">
                  Fee (Gas+Swap)
                </span>
                <span className="text-sm text-white font-mono font-bold">
                  0.05 SOL
                </span>
              </div>
            </div>
            <div className="col-span-2 bg-[#151921] p-5 rounded-2xl border border-[#2A2F3A] flex justify-between items-center relative overflow-hidden group">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#00f0ff] group-hover:w-full group-hover:opacity-10 transition-all duration-500"></div>
              <div className="relative z-10">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider mb-1">
                  Realized PnL
                </p>
                <p className="text-3xl text-[#00f0ff] font-mono font-black drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                  +$985.00
                </p>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider mb-1">
                  ROI
                </p>
                <p className="text-lg text-white font-bold">+12.4%</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                External Proofs
             </label>
             <div className="grid grid-cols-1 gap-3">
                <input 
                    type="text" 
                    placeholder="Paste Birdeye/DexScreener Link..." 
                    value={chartLink}
                    onChange={(e) => setChartLink(e.target.value)}
                    className="w-full bg-[#050505] border border-[#2A2F3A] text-gray-300 p-3 rounded-xl focus:border-[#00f0ff] outline-none text-xs font-mono"
                />
                 <input 
                    type="text" 
                    placeholder="Paste Solscan Transaction Hash..." 
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="w-full bg-[#050505] border border-[#2A2F3A] text-gray-300 p-3 rounded-xl focus:border-[#00f0ff] outline-none text-xs font-mono"
                />
             </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Trader Psychology
             </label>
             <div className="grid grid-cols-3 gap-2">
                {['BULLISH', 'NEUTRAL', 'BEARISH'].map((s) => (
                    <button 
                        key={s}
                        onClick={() => setSentiment(s)}
                        className={`py-3 rounded-xl text-[10px] font-bold border transition-all ${
                            sentiment === s 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#050505] text-gray-500 border-[#2A2F3A] hover:border-gray-500'
                        }`}
                    >
                        {s}
                    </button>
                ))}
             </div>
             <div className="grid grid-cols-4 gap-2">
                {['PERFECT', 'FOMO', 'LATE', 'REVENGE'].map((q) => (
                    <button 
                        key={q}
                        onClick={() => setExecutionQuality(q)}
                        className={`py-2 rounded-lg text-[9px] font-bold border transition-all ${
                            executionQuality === q
                            ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]' 
                            : 'bg-[#050505] text-gray-600 border-[#2A2F3A] hover:border-gray-600'
                        }`}
                    >
                        {q}
                    </button>
                ))}
             </div>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Sauron AI Context
                </label>
                <span className="text-[9px] text-[#00f0ff] border border-[#00f0ff]/30 px-2 py-0.5 rounded bg-[#00f0ff]/10">
                    GENERATED
                </span>
             </div>
             <div className="bg-[#050505] p-4 rounded-xl border border-[#2A2F3A] text-xs text-gray-400 leading-relaxed font-mono">
                "Trade aligned with 4H bullish divergence on RSI. Volume profile indicated strong support at $124. Exit was slightly premature relative to Fibonacci extension levels ($145 target)."
             </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Execution Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-32 bg-[#050505] border border-[#2A2F3A] text-gray-300 p-4 rounded-xl focus:border-[#00f0ff] outline-none text-sm resize-none font-mono placeholder-gray-700 transition-colors"
              placeholder="// Log your entry logic, mistakes, and market conditions..."
            />
          </div>
          <div className="pt-2 pb-8">
            <button className="w-full py-4 bg-white hover:bg-gray-200 text-black font-black uppercase rounded-xl transition shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-widest text-xs">
              Commit to Journal
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default TradingJournalDrawer;