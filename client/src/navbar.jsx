import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <i className="fas fa-cubes"></i> Umkhonto
      </div>
      <button
        className="navbar-toggle"
        aria-controls="navbar-links"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul
        id="navbar-links"
        className={`navbar-links ${isOpen ? 'active' : ''}`}
      >
        <li><a href="#create" onClick={closeMenu}><i className="fas fa-plus-circle"></i> Create NFT</a></li>
        <li><a href="#look-up" onClick={closeMenu}><i className="fas fa-search"></i> Look Up NFT</a></li>
        <li><a href="#buy" className="nav-cta" onClick={closeMenu}><i className="fas fa-shopping-cart"></i> Buy NFT</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;