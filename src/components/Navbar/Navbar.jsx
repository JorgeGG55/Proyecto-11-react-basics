import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleMenu }) => {
  return (
    <nav>
      <NavLink className="navLink" to="" onClick={toggleMenu}>
        Home
      </NavLink>
      <NavLink className="navLink" to="localforecast" onClick={toggleMenu}>
        Local Forecast
      </NavLink>
      <NavLink className="navLink" to="cities" onClick={toggleMenu}>
        Cities Forecast
      </NavLink>
    </nav>
  );
};

export default Navbar;
