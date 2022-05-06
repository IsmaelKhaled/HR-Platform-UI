import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavLink extends Component {
  render() {
    return (
      <Link to={this.props.to}>
        <div
          data-bs-toggle="collapse"
          data-bs-target="#sidebar.show,.overlay.show"
          className="link-overlay"
        >
          {this.props.label}
        </div>
      </Link>
    );
  }
}
