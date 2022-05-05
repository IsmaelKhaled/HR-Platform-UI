import React, { Component } from "react";

export default class TextInput extends Component {
  render() {
    return (
      <div className="row g-2 align-items-center">
        <div className="col-12">
          <label htmlFor={this.props.name}>
            {this.props.label}{" "}
            {this.props.required && <span className="text-danger">*</span>}
          </label>
        </div>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
          />
          {this.props.error && (
            <div className="alert alert-danger">{this.props.error}</div>
          )}
        </div>
      </div>
    );
  }
}
