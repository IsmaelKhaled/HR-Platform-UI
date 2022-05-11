import React, { useEffect, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ReactSortable } from "react-sortablejs";

import * as interviewActions from "../../redux/actions/interviewActions";
import * as testActions from "../../redux/actions/testActions";
import ProcessStepCard from "./ProcessStepCard";
import CenteredModal from "../Common/CenteredModal";

function ProcessSteps({ setSteps, ...props }) {
  const [stepsArray, setStepsArray] = useState([]);
  const [showStepModal, setShowStepModal] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState();
  const [selectedStepType, setSelectedStepType] = useState();
  const [stepSelectOptions, setStepSelectOptions] = useState([]);

  useEffect(() => {
    const { tests, interviews, actions } = props;

    if (!tests) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed: " + error);
      });
    }

    if (!interviews) {
      actions.loadInterviews().catch((error) => {
        alert("Loading interviews failed: " + error);
      });
    }
  }, [props]);

  useEffect(() => {
    if (
      props.interviews &&
      props.tests &&
      props.steps.interviews.length > 0 &&
      props.steps.tests.length > 0
    ) {
      const interviews = props.steps.interviews.map((interview) => {
        return {
          ...props.interviews.find((i) => i.id === interview.id),
          priority: interview.priority,
          type: "interview",
        };
      });
      const tests = props.steps.tests.map((test) => {
        return {
          ...props.tests.find((t) => t.id === test.id),
          priority: test.priority,
          type: "test",
        };
      });

      const arr = [...tests, ...interviews].sort((x, y) =>
        x.priority < y.priority ? -1 : 1
      );
      setStepsArray(arr);
    }
  }, [props.interviews, props.tests]);

  useEffect(() => {
    if (stepsArray.length > 0) {
      const interviews = [];
      const tests = [];
      stepsArray.map(({ type, id }, i) => {
        return type === "interview"
          ? interviews.push({ id, priority: i + 1 })
          : tests.push({ id, priority: i + 1 });
      });
      const steps = { interviews, tests };
      setSteps(steps);
    }
  }, [stepsArray]);

  const handleNewStep = () => {
    if (!selectedStepType) return;
    if (!selectedStepId) return;
    if (selectedStepType === "interview") {
      setStepsArray([
        ...stepsArray,
        {
          ...props.interviews?.find(
            (interview) => interview.id === selectedStepId
          ),
          type: "interview",
        },
      ]);
    }
    if (selectedStepType === "test") {
      setStepsArray([
        ...stepsArray,
        {
          ...props.tests?.find((test) => test.id === selectedStepId),
          type: "test",
        },
      ]);
    }
    setShowStepModal(false);
  };

  const handleStepTypeChange = (e) => {
    const stepType = e.target.value;
    setSelectedStepType(stepType);
    if (stepType === "interview") {
      const selectedInterviewsIds = stepsArray
        .filter((step) => step.type === "interview")
        .map((interview) => interview.id);
      setStepSelectOptions(
        props.interviews
          ?.filter((interview) => !selectedInterviewsIds.includes(interview.id))
          .map((interview) => ({ id: interview.id, name: interview.name }))
      );
    } else if (stepType === "test") {
      const selectedTestsIds = stepsArray
        .filter((step) => step.type === "test")
        .map((test) => test.id);
      setStepSelectOptions(
        props.tests
          ?.filter((test) => !selectedTestsIds.includes(test.id))
          .map((test) => ({ id: test.id, name: test.name }))
      );
    }
  };

  return (
    <>
      <div className="row g-2 align-items-center justify-content-center">
        <div>
          <label htmlFor="steps" className="mb-2">
            Steps <span className="text-danger">*</span>
          </label>
          <div className="list-group-item">
            <Button
              className="ms-auto d-flex"
              variant="outline-primary"
              onClick={() => setShowStepModal(true)}
            >
              +
            </Button>
            <div className="mt-2" id="steps">
              <ReactSortable list={stepsArray} setList={setStepsArray}>
                {stepsArray.map((step) => (
                  <ProcessStepCard step={step} key={step.id} />
                ))}
              </ReactSortable>
            </div>
          </div>
        </div>
      </div>

      <CenteredModal
        show={showStepModal}
        title="Add a step"
        onHide={() => setShowStepModal(false)}
        onSubmit={handleNewStep}
      >
        <form>
          <div className="input-group mb-2">
            <select
              name="selectedStepType"
              className="form-select"
              onChange={handleStepTypeChange}
            >
              <option value="" className="text-muted">
                Select Step Type
              </option>
              <option key="interview" value="interview">
                Interview
              </option>
              <option key="test" value="test">
                Test
              </option>
            </select>
          </div>
          <div className="input-group">
            <select
              name="selectedStepId"
              className="form-select"
              onChange={(e) => setSelectedStepId(e.target.value)}
            >
              <option value="" className="text-muted">
                Select Step
              </option>
              {stepSelectOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </CenteredModal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tests: state.tests,
    interviews: state.interviews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTests: bindActionCreators(testActions.loadTests, dispatch),
      loadInterviews: bindActionCreators(
        interviewActions.loadInterviews,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessSteps);
