import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h4>Navigation</h4>
      <ul>
        <Link to="/portfolio">
          <li>Portfolio</li>
        </Link>
        <Link to="/form">
          <li>Add</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
