import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const VisualizationMock = ({ metrics }) => {
  const [chartMode, setChartMode] = useState("equity"); // 'equity' or 'drawdown'

  const generateData = () => {
    const data = [];
    let currentEquity = metrics.totalValue - metrics.pnl; // Start at cost basis
    let peakEquity = currentEquity;
    
    // Generate 30 days of mock data
    for (let i = 0; i < 30; i++) {
      const volatility = (Math.random() - 0.45) * 800; 
      currentEquity += volatility;
      
      // Track Peak for Drawdown Calc
      if (currentEquity > peakEquity) peakEquity = currentEquity;
      const drawdown = ((currentEquity - peakEquity) / peakEquity) * 100;

      // Force last point to match actual current stats
      if (i === 29) {
        currentEquity = metrics.totalValue;
        const currentDrawdown = ((currentEquity - peakEquity) / peakEquity) * 100;
        data.push({ day: `D${i + 1}`, value: currentEquity, drawdown: currentDrawdown });
      } else {
        data.push({ day: `D${i + 1}`, value: currentEquity, drawdown: drawdown });
      }
    }
    return data;
  };

  const data = generateData();
  const isProfit = metrics.pnl >= 0;
  const color = isProfit ? "#00f0ff" : "#ef4444"; 

  return (
    <div className="bg-[#151921] p-6 rounded-3xl border border-[#2A2F3A] h-full flex flex-col relative overflow-hidden group">
      
      {/* HEADER WITH TOGGLES */}
      <div className="flex justify-between items-start mb-6 z-10">
        <div>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            Performance Analysis
          </h3>
          <div className="flex gap-4">
             <button 
                onClick={() => setChartMode('equity')}
                className={`text-lg font-black italic transition-colors ${chartMode === 'equity' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
             >
                Equity Curve
             </button>
             <button 
                onClick={() => setChartMode('drawdown')}
                className={`text-lg font-black italic transition-colors ${chartMode === 'drawdown' ? 'text-red-400' : 'text-gray-600 hover:text-gray-400'}`}
             >
                Drawdown
             </button>
          </div>
        </div>
        
        {/* TIMEFRAME SELECTOR */}
        <div className="flex gap-2">
            {['1D', '7D', '30D', 'ALL'].map((tf) => (
                <button key={tf} className="text-[10px] font-bold px-2 py-1 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F3A] hover:border-[#00f0ff] hover:text-white transition">
                    {tf}
                </button>
            ))}
        </div>
      </div>

      {/* CHART AREA */}
      <div className="flex-1 min-h-[250px] w-full z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
            <XAxis dataKey="day" hide={true} />
            
            {chartMode === 'equity' ? (
                <>
                    <YAxis domain={['auto', 'auto']} hide={true} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#0B0E11", borderColor: "#2A2F3A", borderRadius: "12px" }}
                        itemStyle={{ color: color, fontWeight: 'bold', fontFamily: 'monospace' }}
                        formatter={(value) => [`$${value.toLocaleString()}`, "Equity"]}
                        labelStyle={{ display: 'none' }}
                    />
                    <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill="url(#equityGradient)" />
                </>
            ) : (
                <>
                    <YAxis domain={[-100, 0]} hide={true} />
                    <ReferenceLine y={0} stroke="#2A2F3A" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#0B0E11", borderColor: "#ef4444", borderRadius: "12px" }}
                        itemStyle={{ color: "#ef4444", fontWeight: 'bold', fontFamily: 'monospace' }}
                        formatter={(value) => [`${value.toFixed(2)}%`, "Drawdown"]}
                        labelStyle={{ display: 'none' }}
                    />
                    <Area type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} fill="url(#drawdownGradient)" />
                </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 ${chartMode === 'equity' && isProfit ? 'bg-cyan-500/10' : 'bg-red-500/10'} blur-[80px] rounded-full pointer-events-none transition-colors duration-500`}></div>
    </div>
  );
};

export default VisualizationMock;