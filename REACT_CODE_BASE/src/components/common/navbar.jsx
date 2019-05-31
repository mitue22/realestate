import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ navItems }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md bg-danger navbar-dash nav-dash">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <i className="fa fa-home" aria-hidden="true" /> |
                </NavLink>
              </li>
              {navItems.map(item => (
                <li key={item.name} className="nav-item clickable">
                  <NavLink className="nav-link" to={item.path}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
