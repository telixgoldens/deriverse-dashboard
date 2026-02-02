import React, { useState } from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets"; // Optional: or use a mock
import { useTheme } from '../context/ThemeContext';

// MOCK DATA FOR TERMINAL
const TERMINAL_DATA = {
    price: 142.50,
    change24h: +5.2,
    vol24h: "1.2B",
    high24h: 145.00,
    low24h: 132.20
};

const TokenTerminal = ({ token, onClose, onSwap }) => {
    const [side, setSide] = useState('long'); // 'long' or 'short' for Deriverse context
    const [amount, setAmount] = useState('');
    const [leverage, setLeverage] = useState(1);

    if (!token) return null;

    // Map your internal symbols to TradingView symbols
    const getTVSymbol = (sym) => {
        if (sym === 'SOL') return 'BINANCE:SOLUSDT';
        if (sym === 'BTC') return 'BINANCE:BTCUSDT';
        if (sym === 'ETH') return 'BINANCE:ETHUSDT';
        return `BINANCE:${sym}USDT`;
    };

    return (
        <div className="fixed inset-0 bg-[#0B0E11] z-50 flex flex-col animate-in fade-in duration-200">
            
            {/* 1. TERMINAL HEADER (Jupiter Style) */}
            <div className="h-16 border-b border-[#2A2F3A] flex justify-between items-center px-6 bg-[#151921]">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
                        ← Back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                            {token.symbol[0]}
                        </div>
                        <div>
                            <h2 className="text-white font-black text-lg flex items-center gap-2">
                                {token.symbol} / USD
                                <span className="text-[10px] bg-[#00f0ff]/10 text-[#00f0ff] px-2 py-0.5 rounded border border-[#00f0ff]/20">PERP</span>
                            </h2>
                        </div>
                    </div>
                    
                    {/* Price Ticker */}
                    <div className="hidden md:flex gap-6 ml-8 border-l border-[#2A2F3A] pl-8">
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-bold">Mark Price</p>
                            <p className={`text-sm font-mono font-bold ${TERMINAL_DATA.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${TERMINAL_DATA.price.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-bold">24h Change</p>
                            <p className={`text-sm font-mono font-bold ${TERMINAL_DATA.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {TERMINAL_DATA.change24h}%
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-bold">24h Vol</p>
                            <p className="text-sm font-mono font-bold text-white">
                                ${TERMINAL_DATA.vol24h}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sauron AI Badge */}
                <div className="flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-purple-300 uppercase">Sauron AI: Bullish Divergence</span>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* LEFT: CHART AREA */}
                <div className="flex-1 bg-[#0B0E11] relative border-r border-[#2A2F3A]">
                    {/* Using React TradingView Widget for the "Pro" look */}
                    <AdvancedRealTimeChart 
                        theme="dark" 
                        symbol={getTVSymbol(token.symbol)}
                        autosize
                        hide_side_toolbar={false}
                        interval="15"
                        timezone="Etc/UTC"
                        style="1"
                        locale="en"
                        toolbar_bg="#151921"
                        enable_publishing={false}
                        allow_symbol_change={false}
                        container_id="tradingview_widget"
                    />
                </div>

                {/* RIGHT: ORDER FORM (The "Action" Panel) */}
                <div className="w-full md:w-[350px] bg-[#151921] flex flex-col border-l border-[#2A2F3A]">
                    
                    {/* Long/Short Tabs */}
                    <div className="flex border-b border-[#2A2F3A]">
                        <button 
                            onClick={() => setSide('long')}
                            className={`flex-1 py-4 font-black uppercase text-xs tracking-widest transition ${
                                side === 'long' ? 'bg-green-500/10 text-green-400 border-b-2 border-green-400' : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            Long
                        </button>
                        <button 
                            onClick={() => setSide('short')}
                            className={`flex-1 py-4 font-black uppercase text-xs tracking-widest transition ${
                                side === 'short' ? 'bg-red-500/10 text-red-400 border-b-2 border-red-400' : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            Short
                        </button>
                    </div>

                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        {/* Leverage Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Leverage</label>
                                <span className="text-xs font-bold text-[#00f0ff]">{leverage}x</span>
                            </div>
                            <input 
                                type="range" 
                                min="1" max="50" 
                                value={leverage} 
                                onChange={(e) => setLeverage(e.target.value)}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                            />
                        </div>

                        {/* Amount Input */}
                        <div className="bg-[#0B0E11] p-4 rounded-xl border border-[#2A2F3A]">
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Size (USDC)</label>
                                <label className="text-[10px] font-bold text-gray-500 uppercase">Bal: $1,240</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="bg-transparent w-full text-2xl font-black text-white outline-none"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-2 py-4 border-t border-b border-[#2A2F3A]">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500 uppercase font-bold">Entry Price</span>
                                <span className="text-white font-mono">${TERMINAL_DATA.price}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500 uppercase font-bold">Liquidation</span>
                                <span className="text-orange-400 font-mono">
                                    ${(side === 'long' ? TERMINAL_DATA.price * 0.9 : TERMINAL_DATA.price * 1.1).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500 uppercase font-bold">Fees</span>
                                <span className="text-white font-mono">$0.45</span>
                            </div>
                        </div>

                        {/* AI Insight (Your Edge) */}
                        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-xl border border-purple-500/20">
                            <h4 className="text-[9px] font-black text-purple-400 uppercase mb-1 flex items-center gap-1">
                                👁️ Sauron Prediction
                            </h4>
                            <p className="text-[10px] text-gray-300 leading-relaxed">
                                High probability of squeeze. 65% of recent volume is on the short side. A Long here aligns with 4H trend.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="p-6 bg-[#151921] border-t border-[#2A2F3A]">
                        <button 
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-white shadow-lg transition transform active:scale-95 ${
                                side === 'long' 
                                ? 'bg-gradient-to-r from-green-600 to-green-500 shadow-green-500/20' 
                                : 'bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/20'
                            }`}
                        >
                            {side === 'long' ? 'Place Long Order' : 'Place Short Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenTerminal;