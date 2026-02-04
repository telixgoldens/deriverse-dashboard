import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-2xl font-black text-white italic tracking-tighter">TRADER ANALYTICS</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Sharpe Ratio</h3>
            <p className="text-3xl font-black text-[#00f0ff]">2.45</p>
            <p className="text-xs text-gray-400 mt-2">Top 5% of traders this week.</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Avg Win</h3>
            <p className="text-3xl font-black text-green-400">+$450.20</p>
            <p className="text-xs text-gray-400 mt-2">Across 42 trades.</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#151921] p-6 rounded-2xl border border-[#2A2F3A]">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Avg Loss</h3>
            <p className="text-3xl font-black text-red-400">-$120.50</p>
            <p className="text-xs text-gray-400 mt-2">Strict stop loss adherence.</p>
        </div>
      </div>

      <div className="bg-[#151921] p-10 rounded-2xl border border-[#2A2F3A] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#2A2F3A] flex items-center justify-center mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h2 className="text-white font-bold mb-2">Advanced Visualizations Loading...</h2>
          <p className="text-gray-500 text-sm max-w-md">
            Sauron AI is compiling your behavioral heatmap. This module requires more trade history to generate accurate patterns.
          </p>
      </div>
    </div>
  );
};

export default Analytics;