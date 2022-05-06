import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-light bg-light shadow-sm sticky-top"
          id="topnav"
        >
          <div className="container-fluid pe-3">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebar,.overlay"
              aria-controls="navbarToggleSidebar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="dropstart">
              <button
                className="btn btn-outline-dark rounded-pill ms-auto"
                data-bs-toggle="dropdown"
              >
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-start">
                <li className="dropdown-item">Login</li>
                <li className="dropdown-item">Register</li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
