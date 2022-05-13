import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ReactSortable } from "react-sortablejs";

import ProcessStepCard from "./ProcessStepCard";
import CenteredModal from "../Common/CenteredModal";
import { useGetAllTestsQuery } from "../../redux/services/test";
import { useGetAllInterviewsQuery } from "../../redux/services/interview";

function ProcessSteps({ setSteps, ...props }) {
  const [stepsArray, setStepsArray] = useState([]);
  const [currentSteps, setCurrentSteps] = useState(props.steps);
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
      (props.steps.interviews.length > 0 || props.steps.tests.length > 0)
    ) {
      const interviewSteps =
        props.steps.interviews.length > 0
          ? props.steps.interviews.map((interview) => {
              return {
                ...interviews.find((i) => i.id === interview.id),
                priority: interview.priority,
                type: "interview",
                chosen: false,
              };
            })
          : [];
      const testSteps =
        props.steps.tests.length > 0
          ? props.steps.tests.map((test) => {
              return {
                ...tests.find((t) => t.id === test.id),
                priority: test.priority,
                type: "test",
                chosen: false,
              };
            })
          : [];

      const arr = [...testSteps, ...interviewSteps].sort((x, y) =>
        x.priority < y.priority ? -1 : 1
      );
      setStepsArray(arr);
    }
  }, [interviews, tests, props.steps]);

  useEffect(() => {
    //TODO: Cleanup this method
    if (!stepsArray.length > 0) return;
    const updatedStepsArr = stepsArray.map((step, i) => ({
      ...step,
      priority: i + 1,
    }));
    const interviewSteps = updatedStepsArr
      .filter((step) => step.type === "interview")
      .map((step) =>
        props.steps.interviews.findIndex(
          (interview) => interview.id === step.id
        ) > -1
          ? {
              ...props.steps.interviews.find(
                (interview) => interview.id === step.id
              ),
              priority: step.priority,
            }
          : { id: step.id, priority: step.priority }
      );
    const testSteps = updatedStepsArr
      .filter((step) => step.type === "test")
      .map((step) =>
        props.steps.tests.findIndex((test) => test.id === step.id) > -1
          ? {
              ...props.steps.tests.find((test) => test.id === step.id),
              priority: step.priority,
            }
          : { id: step.id, priority: step.priority }
      );
    setCurrentSteps({ interviews: interviewSteps, tests: testSteps });
  }, [stepsArray, props.steps]);

  useEffect(() => {
    if (JSON.stringify(props.steps) !== JSON.stringify(currentSteps)) {
      setSteps(currentSteps);
    }
  }, [setSteps, props.steps, currentSteps]);

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
    setStepSelectOptions([]);
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
