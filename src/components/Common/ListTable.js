import React, { Component } from "react";

export default class ListTable extends Component {
  render() {
    return (
      <>
        <div className="table-responsive">
          <table className="table table-hover">{this.props.children}</table>
        </div>
      </>
    );
  }
}

ListTable.Header = ({ children }) => (
  <thead className="table-dark">{children}</thead>
);

ListTable.Body = ({ children }) => (
  <tbody className="align-middle">{children}</tbody>
);
