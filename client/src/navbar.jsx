import React from 'react';
import './Navbar.css'; // Optional: for additional styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Umkhonto</div>
      <ul className="navbar-links">
        <li><a href="#create">Create NFT</a></li>
        <li><a href="#look-up">Look Up NFT</a></li>
        <li><a href="#buy">Buy NFT</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
