import React from 'react';
import { Link } from 'react-router-dom';


import SearchBar from './SearchBar.jsx';
import './Nav.module.css';

function Nav() {
  return (
        <nav className="navbar navbar-dark">
          <Link to='/'>
            Henry - Weather App
          </Link>
          <Link to='/about'>
            <p>About</p>
          </Link>
          <SearchBar/>
        </nav>
  );
};

export default Nav;
