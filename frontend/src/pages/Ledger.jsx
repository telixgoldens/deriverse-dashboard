import React, { useState } from 'react';
import TradingJournalDrawer from '../components/TradingJournalDrawer'; 

const Ledger = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const transactions = [
    { id: "tx_01", symbol: "SOL-PERP", type: "SWAP", asset: "SOL -> USDC", amount: "10.5 SOL", status: "COMPLETED", date: "2024-02-03 14:20", hash: "5x...92a" },
    { id: "tx_02", symbol: "USDC", type: "DEPOSIT", asset: "USDC", amount: "5,000.00 USDC", status: "COMPLETED", date: "2024-02-02 09:15", hash: "2z...11b" },
    { id: "tx_03", symbol: "JUP-PERP", type: "FAIL", asset: "JUP -> SOL", amount: "1,000 JUP", status: "FAILED", date: "2024-02-01 18:30", hash: "9q...88c" },
    { id: "tx_04", symbol: "SOL", type: "WITHDRAW", asset: "SOL", amount: "50.0 SOL", status: "PENDING", date: "2024-02-01 12:00", hash: "1p...33d" },
  ];
  const filteredData = transactions.filter((tx) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DEPOSITS') return tx.type === 'DEPOSIT';
    if (activeFilter === 'WITHDRAWALS') return tx.type === 'WITHDRAW';
    return true;
  });

  const getButtonClass = (filterName) => {
    const baseClass = "px-4 py-1 rounded text-[10px] font-bold transition-all duration-200";
    const activeClass = "bg-[#00f0ff] text-black shadow-[0_0_10px_rgba(0,240,255,0.3)]";
    const inactiveClass = "bg-[#0B0E11] text-gray-400 border border-[#2A2F3A] hover:bg-[#2A2F3A]";
    return `${baseClass} ${activeFilter === filterName ? activeClass : inactiveClass}`;
  };

  const handleOpenJournal = (trade) => {
    setSelectedTrade(trade);
    setIsJournalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <h1 className="text-2xl font-black text-white italic tracking-tighter">TRANSACTION LEDGER</h1>
      <div className="bg-[#151921] rounded-2xl border border-[#2A2F3A] overflow-hidden">
        
        <div className="p-4 border-b border-[#2A2F3A] flex gap-2">
            <button onClick={() => setActiveFilter('ALL')} className={getButtonClass('ALL')}>ALL</button>
            <button onClick={() => setActiveFilter('DEPOSITS')} className={getButtonClass('DEPOSITS')}>DEPOSITS</button>
            <button onClick={() => setActiveFilter('WITHDRAWALS')} className={getButtonClass('WITHDRAWALS')}>WITHDRAWALS</button>
        </div>

        <table className="w-full text-left">
            <thead className="bg-[#0B0E11] text-gray-500 text-[10px] uppercase font-black">
                <tr>
                    <th className="p-4">Type</th>
                    <th className="p-4">Asset Details</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Hash</th>
                    <th className="p-4 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2F3A] text-xs font-mono">
                {filteredData.length > 0 ? (
                    filteredData.map(tx => (
                        <tr key={tx.id} className="hover:bg-white/5 transition group">
                            <td className="p-4 font-bold text-white">{tx.type}</td>
                            <td className="p-4 text-gray-300">{tx.asset}</td>
                            <td className="p-4 text-white">{tx.amount}</td>
                            <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                                    tx.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                    tx.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                }`}>
                                    {tx.status}
                                </span>
                            </td>
                            <td className="p-4 text-gray-500">{tx.date}</td>
                            <td className="p-4 text-right text-[#00f0ff] cursor-pointer hover:underline">{tx.hash}</td>
                            <td className="p-4 text-center">
                                <button 
                                    onClick={() => handleOpenJournal(tx)}
                                    className="p-2 rounded bg-[#0B0E11] border border-[#2A2F3A] text-gray-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all group-hover:bg-white/5"
                                    title="Open Journal"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="p-8 text-center text-gray-500 italic">
                            No transactions found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
      <TradingJournalDrawer 
        isOpen={isJournalOpen} 
        onClose={() => setIsJournalOpen(false)} 
        trade={selectedTrade} 
      />
    </div>
  );
};

export default Ledger;