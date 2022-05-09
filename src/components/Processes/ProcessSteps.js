import React from "react";
import { Button } from "react-bootstrap";

function ProcessSteps(props) {
  return (
    <div>
      <div className="list-group container">
        <label htmlFor="steps">Steps</label>
        <div className="list-group-item">
          <Button className="ms-auto d-flex" variant="outline-primary">
            +
          </Button>
          {props.steps.length > 0 &&
            props.steps.tests.map((test) => (
              <div className="list-group-item">{test}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProcessSteps;
