import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletContextProvider } from "./context/WalletContextProvider"; 
import Dashboard from "./pages/Dashboard"; 
import LandingPage from "./components/LandingPage"; 
import { useWallet } from "@solana/wallet-adapter-react";


const Content = () => {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen w-full bg-[#0B0E11] text-gray-200 font-sans selection:bg-[#00f0ff]/30 selection:text-[#00f0ff]">
      {!connected ? (
        <LandingPage />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WalletContextProvider>
         <Content />
      </WalletContextProvider>
    </ThemeProvider>
  );
}

export default App;