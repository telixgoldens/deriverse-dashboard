import { useMemo } from 'react';

export const useTraderMetrics = (portfolio) => {
  return useMemo(() => {
    // 1. Basic PnL & Value
    const totalValue = portfolio.reduce((sum, item) => sum + item.quantity * (item.price || 0), 0);
    const costBasis = portfolio.reduce((sum, item) => sum + item.quantity * item.entryPrice, 0);
    
    // Calculate Unrealized (Floating PnL of open positions)
    const unrealizedPnL = portfolio.reduce((sum, item) => sum + item.pnl, 0);
    
    // 2. Mock Realized PnL (Money already banked from closed trades)
    // In a real production app, this would come from a separate "History" API endpoint
    const realizedPnL = 4203.50; 
    
    const totalPnL = unrealizedPnL + realizedPnL;
    
    // 3. Advanced Stats
    // Logic: If PnL is positive, we assume a higher win rate for the demo
    const winRate = unrealizedPnL >= 0 ? 64.2 : 41.5;
    const avgDuration = "4h 12m";

    // 4. Long/Short Ratio Logic
    const longCount = portfolio.filter((p) => p.side === "long").length;
    const shortCount = portfolio.filter((p) => p.side === "short").length;
    const totalCount = longCount + shortCount || 1;
    const longPercentage = Math.round((longCount / totalCount) * 100);

    // 5. Fee Calculations
    // We sum up the fees from the individual positions in the portfolio
    const calculatedFees = portfolio.reduce((sum, item) => sum + (item.fees || 0), 0);
    const totalFees = 12.5 + calculatedFees; // Base fees + active position fees

    return {
      totalValue,
      unrealizedPnL,
      realizedPnL,
      totalPnL,
      // Avoid division by zero
      pnlPercent: costBasis > 0 ? (unrealizedPnL / costBasis) * 100 : 0,
      winRate,
      profitFactor: unrealizedPnL >= 0 ? 2.4 : 0.8,
      totalFees: totalFees.toFixed(2),
      feeBreakdown: { 
          network: (totalFees * 0.3).toFixed(2), // Mock split: 30% network
          swap: (totalFees * 0.7).toFixed(2)     // Mock split: 70% swap
      },
      avgDuration,
      longShortRatio: { 
          long: longPercentage, 
          short: 100 - longPercentage 
      },
      bestTrade: { symbol: "SOL", amount: 420 },
      worstTrade: { symbol: "WIF", amount: -150 },
    };
  }, [portfolio]);
};