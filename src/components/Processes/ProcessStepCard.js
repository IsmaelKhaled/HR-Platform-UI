import React from "react";

export default function ProcessStepCard({ step }) {
  return (
    <div className="card mb-3 shadow-sm rounded border-0">
      <div className="card-header">
        {step.name && (
          <h5 className="card-title d-flex align-items-center m-1">
            {step.name}
            <span className="d-flex ms-auto badge bg-primary text-white text-uppercase">
              {step.type}
            </span>
          </h5>
        )}
      </div>
    </div>
  );
}
