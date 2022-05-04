import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Collapse } from "bootstrap"; // Required for collapse to function

export default class Sidebar extends Component {
  render() {
    return (
      <>
        <nav
          id="sidebar"
          className="col-md-3 col-lg-2 col-12 collapse collapse-horizontal shadow navbar-expand"
        >
          <div className="sidebar-header">
            <h3>
              Luftborn HR Platform
              <button
                className="btn btn-outline"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebar"
                aria-controls="navbarToggleSidebar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Hide
              </button>
            </h3>
          </div>

          <ul className="list-unstyled components shadow-sm">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a
                href="#processSubmenu"
                data-bs-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Process
              </a>
              <ul className="collapse list-unstyled" id="processSubmenu">
                <li className="nav-item">
                  {/* <a
                    href="#interviewsSubmenu"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Interviews
                  </a> */}
                  <Link to="/interviews">Interviews</Link>
                  {/* <ul className="collapse list-unstyled" id="interviewsSubmenu">
                  </ul> */}
                </li>
                <li className="nav-item">
                  <Link to="/">Tests</Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li className="justify-content-center d-flex">
              <small>Powered by Luftborn</small>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
