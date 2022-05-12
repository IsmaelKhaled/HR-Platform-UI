import React, { useState } from "react";

export default function ProcessStepCard({ step, removeStep }) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div
      className="card mb-3 shadow-sm rounded border-0"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="card-header">
        {step.name && (
          <h5
            className="card-title d-flex align-items-center m-1"
            style={{ height: "25.5px" }}
          >
            {step.name}
            <span className="d-md-flex ms-auto">
              <span className="badge rounded-pill bg-primary text-white text-uppercase">
                {step.type}
              </span>
            </span>
            <span
              className={
                "d-flex ms-2" + (showDelete ? " d-block" : " d-md-none")
              }
            >
              <button
                type="button"
                onClick={() => removeStep(step.id)}
                className={"btn btn-outline-danger"}
              >
                &minus;
              </button>
            </span>
          </h5>
        )}
      </div>
    </div>
  );
}
