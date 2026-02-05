export const Web3Service = {
  connectWallet: async () => {
    try {
      const provider = window.solana;
      
      if (provider && provider.isPhantom) {
        const response = await provider.connect();
        return { 
          address: response.publicKey.toString(), 
          provider 
        };
      } else {
        console.warn("Phantom not found. Simulating connection...");
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ 
              address: "5KTn...92x (Demo)", 
              provider: null 
            });
          }, 600); 
        });
      }
    } catch (error) {
      console.error("Connection cancelled", error);
      throw error;
    }
  },

  getTokenBalance: async (tokenAddress, walletAddress) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balanceRanges = {
          'SOL': () => (Math.random() * 50 + 10).toFixed(4), 
          'USDC': () => (Math.random() * 5000 + 1000).toFixed(2), 
          'default': () => (Math.random() * 100).toFixed(4)
        };
        const key = tokenAddress.length < 10 ? tokenAddress : 'default'; 
        const getBalance = balanceRanges[key] || balanceRanges.default;
        resolve(getBalance());
      }, 400);
    });
  },

  signTransaction: async (transaction) => {
    console.log("Signing Solana Transaction...", transaction);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) {
          resolve({
            signature: `${Math.random().toString(36).substring(2, 15)}...`,
            status: 'confirmed',
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error('Transaction failed: Slippage Exceeded'));
        }
      }, 1200);
    });
  }
};

export const AIService = {
  fetchAssetAnalysis: async (symbol) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sentiments = ['Bullish', 'Bearish', 'Neutral'];
        const risks = ['Low', 'Medium', 'High'];
        
        resolve({
          tradingVenue: "Deriverse Liquidity Layer",
          marketNews: `${symbol} Funding Rates are stabilizing. Open Interest (OI) has increased by 12% in the last hour.`,
          riskAssessment: `${risks[Math.floor(Math.random() * risks.length)]} Risk. Volatility is contracting.`,
          sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
          confidence: `${(Math.random() * 30 + 70).toFixed(1)}%`
        });
      }, 1000);
    });
  }
};

export const fetchLivePrices = async (holdings) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prices = {};
      holdings.forEach(holding => {
        const symbol = holding.symbol;
        const fluctuation = 1 + (Math.random() * 0.02 - 0.01); 
        
        prices[symbol] = {
          price: (holding.price * fluctuation).toFixed(4),
          change24h: (Math.random() * 10 - 2).toFixed(2), 
          lastUpdated: new Date().toISOString()
        };
      });
      resolve(prices);
    }, 800);
  });
};