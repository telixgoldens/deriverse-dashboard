import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const VisualizationMock = ({ metrics, timeFrame = "30D" }) => {
  const [chartMode, setChartMode] = useState("equity");

  // SAFEGUARD: Default metrics if they fail to load
  const safeMetrics = metrics || { totalValue: 10000, pnl: 0 };

  const data = useMemo(() => {
    const chartData = [];
    let currentEquity = safeMetrics.totalValue; 
    
    // Determine points based on timeframe
    let points = 30;
    if (timeFrame === '1D') points = 24;
    if (timeFrame === '7D') points = 7;
    if (timeFrame === 'ALL') points = 90;

    let peakEquity = currentEquity;

    for (let i = 0; i < points; i++) {
      // Generate realistic-looking random walk data
      const volatility = (Math.random() - 0.48) * (safeMetrics.totalValue * 0.02); 
      currentEquity += volatility;
      
      if (currentEquity > peakEquity) peakEquity = currentEquity;
      const drawdown = ((currentEquity - peakEquity) / peakEquity) * 100;

      chartData.push({ 
        name: i, 
        value: currentEquity, 
        drawdown: drawdown 
      });
    }
    return chartData;
  }, [safeMetrics, timeFrame]);

  const isProfit = (data[data.length - 1]?.value || 0) >= safeMetrics.totalValue;
  const color = isProfit ? "#00f0ff" : "#ef4444"; 

  return (
    <div className="bg-[#151921] p-6 rounded-3xl border border-[#2A2F3A] flex flex-col relative overflow-hidden h-[400px]"> {/* Fixed Height Added */}
      
      <div className="flex justify-between items-start mb-4 z-10">
        <div>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Performance Analysis</h3>
          <div className="flex gap-4">
             <button onClick={() => setChartMode('equity')} className={`text-lg font-black italic transition-colors ${chartMode === 'equity' ? 'text-white' : 'text-gray-600'}`}>Equity</button>
             <button onClick={() => setChartMode('drawdown')} className={`text-lg font-black italic transition-colors ${chartMode === 'drawdown' ? 'text-red-400' : 'text-gray-600'}`}>Drawdown</button>
          </div>
        </div>
        <div className="px-3 py-1 bg-[#0B0E11] rounded border border-[#2A2F3A] text-[10px] font-mono text-cyan-400">
            {timeFrame}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip 
                contentStyle={{ backgroundColor: "#0B0E11", borderColor: "#2A2F3A" }} 
                itemStyle={{ color: color }}
                formatter={(val) => [chartMode === 'equity' ? `$${val.toLocaleString()}` : `${val.toFixed(2)}%`, chartMode === 'equity' ? 'Value' : 'DD']}
            />
            {chartMode === 'equity' ? (
                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill="url(#equityGradient)" />
            ) : (
                <Area type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} fill="url(#drawdownGradient)" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisualizationMock;