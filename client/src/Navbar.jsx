import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isConnected, accounts, connectWallet }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-main">Umkhonto</div>
        <div className="brand-tagline">Never Forget</div>
      </div>
      <ul className="navbar-links">
        <li><Link to="/create">Create NFT</Link></li>
        <li><Link to="/look-up">Look Up NFT</Link></li>
        <li><Link to="/buy">Buy NFT</Link></li>
        <li>
          {!isConnected ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <span className="connection-status">Connected: {accounts[0]?.slice(0, 6)}...{accounts[0]?.slice(-4)}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
