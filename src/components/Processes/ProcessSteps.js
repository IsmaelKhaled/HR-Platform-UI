import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ReactSortable } from "react-sortablejs";

import ProcessStepCard from "./ProcessStepCard";
import CenteredModal from "../Common/CenteredModal";
import { useGetAllTestsQuery } from "../../redux/services/test";
import { useGetAllInterviewsQuery } from "../../redux/services/interview";

function ProcessSteps({ setSteps, ...props }) {
  const [stepsArray, setStepsArray] = useState([]);
  const [showStepModal, setShowStepModal] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState();
  const [selectedStepType, setSelectedStepType] = useState();
  const [stepSelectOptions, setStepSelectOptions] = useState([]);

  const { data: tests } = useGetAllTestsQuery();
  const { data: interviews } = useGetAllInterviewsQuery();

  useEffect(() => {
    if (
      interviews &&
      tests &&
      props.steps.interviews.length > 0 &&
      props.steps.tests.length > 0
    ) {
      const interviewSteps = props.steps.interviews.map((interview) => {
        return {
          ...interviews.find((i) => i.id === interview.id),
          priority: interview.priority,
          type: "interview",
        };
      });
      const testSteps = props.steps.tests.map((test) => {
        return {
          ...tests.find((t) => t.id === test.id),
          priority: test.priority,
          type: "test",
        };
      });

      const arr = [...testSteps, ...interviewSteps].sort((x, y) =>
        x.priority < y.priority ? -1 : 1
      );
      setStepsArray(arr);
    }
  }, [interviews, tests]);

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
          ...interviews?.find((interview) => interview.id === selectedStepId),
          type: "interview",
        },
      ]);
    }
    if (selectedStepType === "test") {
      setStepsArray([
        ...stepsArray,
        {
          ...tests?.find((test) => test.id === selectedStepId),
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
        interviews
          ?.filter((interview) => !selectedInterviewsIds.includes(interview.id))
          .map((interview) => ({ id: interview.id, name: interview.name }))
      );
    } else if (stepType === "test") {
      const selectedTestsIds = stepsArray
        .filter((step) => step.type === "test")
        .map((test) => test.id);
      setStepSelectOptions(
        tests
          ?.filter((test) => !selectedTestsIds.includes(test.id))
          .map((test) => ({ id: test.id, name: test.name }))
      );
    }
  };

  const removeStep = (stepId) => {
    setStepsArray(stepsArray.filter((step) => step.id !== stepId));
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
                  <ProcessStepCard
                    step={step}
                    key={step.id}
                    removeStep={removeStep}
                  />
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

export default ProcessSteps;
