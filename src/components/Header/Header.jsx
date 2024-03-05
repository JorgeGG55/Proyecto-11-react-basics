import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header>
      <div className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
        <Navbar toggleMenu={toggleMenu} />
      </div>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <h1>Weather App</h1>
      <div className="nav-links">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
