import React, { Component } from "react";

export default class FormCard extends Component {
  render() {
    return (
      <>
        <div className="card mb-3 shadow rounded b-0">
          {(this.props.title || this.props.formText) && (
            <div className="card-header bg-primary text-white">
              {this.props.title && (
                <h3 className="card-title">{this.props.title}</h3>
              )}
              {this.props.formText && (
                <div className="form-text">{this.props.formText}</div>
              )}
            </div>
          )}
          <div className="card-body">{this.props.children}</div>
        </div>
      </>
    );
  }
}
