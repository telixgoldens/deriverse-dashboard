import React from "react";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import "../styles/landingPage.css";

const LandingPage = () => {
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  return (
    <div className="landing-container">
      <div className="landing-background">
        <div className="landing-overlay"></div>
      </div>
      <div className="content-wrapper">
        <div className="ecosystem-badge">
          <span className="status-dot"></span>
          <span className="badge-text">Deriverse Ecosystem</span>
        </div>
        <h1 className="hero-title">
          TRACK<span className="highlight-text">PAD</span>
        </h1>
        <p className="hero-subtitle">
          Institutional-grade portfolio analytics and execution terminal built
          for the <strong>Deriverse</strong> protocol.
          <br className="desktop-break" /> Trade with Sauron AI insights. Trust
          nothing but the code.
        </p>
        <button className="connect-btn" onClick={handleConnect}>
          <div className="btn-gradient-bg"></div>
          <div className="btn-content">
            <div className="btn-text-group">
              <span className="btn-label">Initialize</span>
              <span className="btn-main-text">Connect Wallet</span>
            </div>
            <div className="arrow-circle">
              <svg
                className="arrow-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </button>
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-value">2.4s</p>
            <p className="stat-label">Latency</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">100%</p>
            <p className="stat-label">On-Chain</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">AI</p>
            <p className="stat-label">Powered</p>
          </div>
        </div>
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
};

export default LandingPage;