import React from "react";
import "./Sidebar.scss";
// eslint-disable-next-line no-unused-vars
import { Collapse } from "bootstrap"; // Required for collapse to function
import NavLink from "./NavLink";

export default function Sidebar() {
  return (
    <>
      <nav
        id="sidebar"
        className="col-md-3 col-lg-2 col-12 collapse collapse-horizontal"
      >
        <div className="sidebar-header">
          <h3>Luftborn HR Platform</h3>
        </div>

        <ul className="list-unstyled components shadow-sm">
          <li className="nav-item">
            <NavLink to="/" label="Home" />
          </li>
          <li className="nav-item">
            <a
              href="#processSubmenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="link-overlay">Process</div>
            </a>
            <ul className="collapse list-unstyled" id="processSubmenu">
              <li className="nav-item">
                <NavLink to="/interviews" label="Interviews" />
              </li>
              <li className="nav-item">
                <NavLink to="/tests" label="Tests" />
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
