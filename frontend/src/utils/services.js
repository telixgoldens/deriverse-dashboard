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
        // Fallback for Demo (if no wallet installed)
        console.warn("Phantom not found. Simulating connection...");
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ 
              address: "5KTn...92x (Demo)", 
              provider: null 
            });
          }, 800);
        });
      }
    } catch (error) {
      console.error("Connection cancelled", error);
      throw error;
    }
  },

  // 2. Mock Fetching Balances
  getTokenBalance: async (tokenAddress, walletAddress) => {
    // In a real app, use @solana/web3.js connection.getTokenAccountsByOwner
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return random realistic balances for demo
        // Simulate different balance ranges based on token type
        const balanceRanges = {
          'SOL': () => (Math.random() * 50 + 1).toFixed(4),
          'USDC': () => (Math.random() * 1000 + 100).toFixed(2),
          'default': () => (Math.random() * 100).toFixed(4)
        };
        
        const getBalance = balanceRanges[tokenAddress] || balanceRanges.default;
        resolve(getBalance());
      }, 500);
    });
  },

  // 3. Mock Transaction Approval/Signing
  signTransaction: async (transaction) => {
    console.log("Signing Solana Transaction...", transaction);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({
            signature: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 8)}`,
            status: 'confirmed',
            timestamp: new Date().toISOString()
          });
        } else {
          reject(new Error('Transaction failed: Insufficient funds or user rejected'));
        }
      }, 1000);
    });
  }
};

export const AIService = {
  fetchAssetAnalysis: async (symbol) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate varied mock analysis based on symbol
        const sentiments = ['Bullish', 'Bearish', 'Neutral'];
        const risks = ['Low Risk', 'Medium Risk', 'High Risk'];
        const volumeChanges = [5, 10, 15, 20, 25, -5, -10];
        
        const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        const risk = risks[Math.floor(Math.random() * risks.length)];
        const volumeChange = volumeChanges[Math.floor(Math.random() * volumeChanges.length)];
        
        const newsTemplates = [
          `${symbol} volume is ${volumeChange > 0 ? 'up' : 'down'} ${Math.abs(volumeChange)}% in the last hour. Whale accumulation detected on-chain.`,
          `Recent DEX activity shows ${symbol} trending ${sentiment.toLowerCase()}. Major liquidity pool changes detected.`,
          `${symbol} breaking key resistance levels. On-chain metrics indicate strong ${sentiment.toLowerCase()} momentum.`
        ];
        
        resolve({
          tradingVenue: "Jupiter Aggregator",
          marketNews: newsTemplates[Math.floor(Math.random() * newsTemplates.length)],
          riskAssessment: `${risk}. Volatility is ${Math.random() > 0.5 ? 'expanding' : 'contracting'}.`,
          sentiment: sentiment,
          confidence: `${(Math.random() * 30 + 70).toFixed(1)}%`
        });
      }, 1500);
    });
  }
};

// MOCK PRICE FEED
export const fetchLivePrices = async (holdings) => {
  // In real app: Fetch from Pyth Network or Jupiter API
  return new Promise((resolve) => {
    setTimeout(() => {
      const prices = {};
      
      // Generate mock prices for each holding
      holdings.forEach(holding => {
        const symbol = holding.symbol || holding.token;
        
        // Base prices for common tokens
        const basePrices = {
          'SOL': 150 + (Math.random() * 20 - 10),
          'USDC': 1.0,
          'USDT': 1.0,
          'BTC': 65000 + (Math.random() * 2000 - 1000),
          'ETH': 3500 + (Math.random() * 200 - 100),
          'RAY': 2.5 + (Math.random() * 0.5 - 0.25),
          'ORCA': 3.2 + (Math.random() * 0.6 - 0.3)
        };
        
        // Use base price or generate random price for unknown tokens
        const price = basePrices[symbol] || (Math.random() * 10 + 0.1);
        
        prices[symbol] = {
          price: parseFloat(price.toFixed(6)),
          change24h: (Math.random() * 20 - 10).toFixed(2), // -10% to +10%
          volume24h: (Math.random() * 1000000).toFixed(0),
          lastUpdated: new Date().toISOString()
        };
      });
      
      resolve(prices);
    }, 800);
  });
};