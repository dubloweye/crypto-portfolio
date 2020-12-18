import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const navStyle = {
        color: 'white',

    }
  return (
    <nav className='navbar'>
      <h4>Navigation</h4>
      <ul className='navlinks'>
        <Link style={navStyle} to="/portfolio">
          <li>View Portfolio</li>
        </Link>
        <Link style={navStyle} to="/form">
          <li>Add to Portfolio</li>
        </Link>
        <Link style={navStyle} to="/history">
          <li>View Transaction History</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;