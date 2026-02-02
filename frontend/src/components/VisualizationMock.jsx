import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VisualizationMock = ({ metrics }) => {
  const generateData = () => {
    const data = [];
    let currentEquity = metrics.totalValue - metrics.pnl; // Start at cost basis
    const points = 30; 
    
    // Create a jagged "trader" equity curve
    for (let i = 0; i < points; i++) {
      const volatility = (Math.random() - 0.45) * 500; // Random daily swing
      currentEquity += volatility;
      
      // Ensure the last point matches the actual current Total Value
      if (i === points - 1) currentEquity = metrics.totalValue;

      data.push({
        day: `D${i + 1}`,
        value: currentEquity,
        pnl: currentEquity - (metrics.totalValue - metrics.pnl)
      });
    }
    return data;
  };

  const data = generateData();
  const isProfit = metrics.pnl >= 0;
  const color = isProfit ? "#00f0ff" : "#ef4444"; // Cyan for profit, Red for loss

  return (
    <div className="bg-[#151921] p-6 rounded-3xl border border-[#2A2F3A] h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 z-10">
        <div>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            Performance Analysis
          </h3>
          <p className="text-white text-lg font-black italic">
            30-Day Equity Curve
          </p>
        </div>
        <div className="flex gap-2">
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">1D</span>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">30D</span>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">ALL</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[250px] w-full z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
            <XAxis 
                dataKey="day" 
                hide={true} 
            />
            <YAxis 
                hide={true} 
                domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0B0E11",
                borderColor: "#2A2F3A",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: color, fontWeight: 'bold' }}
              labelStyle={{ display: 'none' }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Equity"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Background Glow Effect */}
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 ${isProfit ? 'bg-cyan-500/10' : 'bg-red-500/10'} blur-[80px] rounded-full pointer-events-none`}></div>
    </div>
  );
};

export default VisualizationMock;