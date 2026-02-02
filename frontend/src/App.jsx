import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard"; 
import LandingPage from "./components/LandingPage"; // Import the new page
import { Web3Service } from "./utils/services";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // This function handles the transition from Landing -> Dashboard
  const handleLogin = async () => {
    setIsConnecting(true);
    try {
      // We call your service to trigger the wallet popup
      await Web3Service.connectWallet();
      
      // Artificial delay to show the animation (optional, feels smoother)
      setTimeout(() => {
        setWalletConnected(true);
        setIsConnecting(false);
      }, 800);
      
    } catch (error) {
      console.error("Connection failed", error);
      setIsConnecting(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-[#0B0E11] text-gray-200 font-sans selection:bg-[#00f0ff]/30 selection:text-[#00f0ff]">
        
        {/* CONDITIONAL RENDERING */}
        {!walletConnected ? (
          <LandingPage onConnect={handleLogin} />
        ) : (
          <Dashboard />
        )}

      </div>
    </ThemeProvider>
  );
}

export default App;