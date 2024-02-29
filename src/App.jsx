import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

const Navbar = ({ toggleMenu }) => {
  return (
    <nav className="navbar">
      <NavLink className="navLink" to="" onClick={toggleMenu}>
        Home
      </NavLink>
      <NavLink className="navLink" to="local" onClick={toggleMenu}>
        Local Forecast
      </NavLink>
      <NavLink className="navLink" to="cities" onClick={toggleMenu}>
        Cities Forecast
      </NavLink>
    </nav>
  );
};

const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
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
      <main>
        <div className="firstContainer">
          <Outlet />
        </div>
      </main>
      <footer>
        <p>© 2024 by Jorge Gravel for Rock{'{TheCode}'}</p>
      </footer>
    </>
  );
};

export default App;
