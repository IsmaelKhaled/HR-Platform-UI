import React from "react";

export default function TextInput(props) {
  return (
    <div className="row g-2 align-items-center">
        <div className="col-12">
          <label htmlFor={props.name}>
            {props.label}{" "}
            {props.required && <span className="text-danger">*</span>}
          </label>
        </div>
        <div className="col-12">
          <input
            className="form-control"
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
          />
          {props.error && (
            <div className="alert alert-danger">{props.error}</div>
          )}
        </div>
      </div>
  )
}

