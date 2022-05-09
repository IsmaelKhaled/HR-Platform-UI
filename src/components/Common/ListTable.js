import React from "react";

export default function ListTable(props) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">{props.children}</table>
      </div>
    </>
  );
}

ListTable.Header = ({ children }) => (
  <thead className="table-dark">{children}</thead>
);

ListTable.Body = ({ children }) => (
  <tbody className="align-middle">{children}</tbody>
);
