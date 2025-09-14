import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Umkhonto</div>
      <div
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><a href="#create">Create NFT</a></li>
        <li><a href="#look-up">Look Up NFT</a></li>
        <li><a href="#buy">Buy NFT</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
