import React from "react";
import { Link } from "react-router-dom";

export default function NavLink(props) {
  return (
    <Link to={props.to}>
        <div
          data-bs-toggle="collapse"
          data-bs-target="#sidebar.show,.overlay.show"
          className="link-overlay"
        >
          {props.label}
        </div>
      </Link>
  )
}
