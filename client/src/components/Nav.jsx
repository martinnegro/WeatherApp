import React from 'react';
import { Link } from 'react-router-dom';


import SearchBar from './SearchBar.jsx';
import './Nav.module.css';

function Nav({onSearch}) {
  return (
        <nav className="navbar navbar-dark">
          <Link to='/'>
            
            Henry - Weather App
          </Link>
          <Link to='/about'>
            <p>About</p>
          </Link>
          <SearchBar onSearch={onSearch}/>
        </nav>
  );
};

export default Nav;
