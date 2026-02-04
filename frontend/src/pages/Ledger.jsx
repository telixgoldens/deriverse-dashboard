import React from 'react';

const Ledger = () => {
  const transactions = [
    { id: "tx_01", type: "SWAP", asset: "SOL -> USDC", amount: "10.5 SOL", status: "COMPLETED", date: "2024-02-03 14:20", hash: "5x...92a" },
    { id: "tx_02", type: "DEPOSIT", asset: "USDC", amount: "5,000.00 USDC", status: "COMPLETED", date: "2024-02-02 09:15", hash: "2z...11b" },
    { id: "tx_03", type: "FAIL", asset: "JUP -> SOL", amount: "1,000 JUP", status: "FAILED", date: "2024-02-01 18:30", hash: "9q...88c" },
    { id: "tx_04", type: "WITHDRAW", asset: "SOL", amount: "50.0 SOL", status: "PENDING", date: "2024-02-01 12:00", hash: "1p...33d" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-2xl font-black text-white italic tracking-tighter">TRANSACTION LEDGER</h1>
      
      <div className="bg-[#151921] rounded-2xl border border-[#2A2F3A] overflow-hidden">
        <div className="p-4 border-b border-[#2A2F3A] flex gap-2">
            <button className="px-4 py-1 rounded bg-[#00f0ff] text-black text-[10px] font-bold">ALL</button>
            <button className="px-4 py-1 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F3A] text-[10px] font-bold">DEPOSITS</button>
            <button className="px-4 py-1 rounded bg-[#0B0E11] text-gray-400 border border-[#2A2F3A] text-[10px] font-bold">WITHDRAWALS</button>
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
                </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2F3A] text-xs font-mono">
                {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-white/5 transition">
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
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;