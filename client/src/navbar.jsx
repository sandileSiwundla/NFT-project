import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">Umkhonto</div>
      <button
        className="navbar-toggle"
        aria-controls="navbar-links"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <ul
        id="navbar-links"
        className={`navbar-links ${isOpen ? 'active' : ''}`}
      >
        <li><a href="#create">Create NFT</a></li>
        <li><a href="#look-up">Look Up NFT</a></li>
        <li><a href="#buy">Buy the real NFT</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
