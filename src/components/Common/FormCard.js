import React from "react";

export default function FormCard(props) {
  return (
    <>
      <div className="card mb-3 shadow rounded border-0">
        {(props.title || props.formText) && (
          <div className="card-header bg-primary text-white">
            {props.title && <h3 className="card-title">{props.title}</h3>}
            {props.formText && (
              <div className="form-text">{props.formText}</div>
            )}
          </div>
        )}
        <div className="card-body">{props.children}</div>
      </div>
    </>
  );
}
