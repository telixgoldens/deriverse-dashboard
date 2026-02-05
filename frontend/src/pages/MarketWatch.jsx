import React, { useState, useEffect } from 'react';

const MarketWatch = ({ onTrade }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('deriverse_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const assets = [
    { symbol: "SOL", price: 145.23, change: 5.4, volume: "1.2B", cap: "65B" },
    { symbol: "BTC", price: 64230.00, change: -1.2, volume: "24B", cap: "1.2T" },
    { symbol: "ETH", price: 3450.12, change: 2.1, volume: "12B", cap: "400B" },
    { symbol: "JUP", price: 1.23, change: 12.5, volume: "450M", cap: "1.2B" },
    { symbol: "BONK", price: 0.000023, change: -5.4, volume: "120M", cap: "800M" },
  ];

  useEffect(() => {
    localStorage.setItem('deriverse_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (e, symbol) => {
    e.stopPropagation(); 
    setWatchlist(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-white italic tracking-tighter">MARKET WATCH</h1>
        <div className="text-[10px] font-mono text-gray-500">WATCHING: <span className="text-[#00f0ff]">{watchlist.length} ASSETS</span></div>
      </div>

      <div className="bg-[#151921] rounded-2xl border border-[#2A2F3A] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0B0E11] text-gray-500 text-[10px] uppercase font-black tracking-wider">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4">Asset</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-right">24h Change</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2F3A] text-sm font-medium">
            {assets.map((asset) => (
              <tr 
                key={asset.symbol} 
                onClick={() => onTrade(asset)} 
                className="hover:bg-white/5 transition group cursor-pointer"
              >
                <td className="p-4">
                    <button 
                        onClick={(e) => toggleWatchlist(e, asset.symbol)}
                        className={`text-lg transition ${watchlist.includes(asset.symbol) ? 'text-yellow-500' : 'text-gray-700 hover:text-gray-400'}`}
                    >
                        {watchlist.includes(asset.symbol) ? '★' : '☆'}
                    </button>
                </td>
                <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                        {asset.symbol[0]}
                    </div>
                    <span className="text-white font-bold">{asset.symbol}</span>
                </td>
                <td className="p-4 text-right font-mono text-white">${asset.price.toLocaleString()}</td>
                <td className={`p-4 text-right font-mono ${asset.change >= 0 ? 'text-[#00ff9d]' : 'text-red-500'}`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                </td>
                <td className="p-4 text-right">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onTrade(asset); }}
                        className="px-3 py-1 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 rounded hover:bg-[#00f0ff] hover:text-black transition text-[10px] font-bold uppercase"
                    >
                        Trade
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketWatch;