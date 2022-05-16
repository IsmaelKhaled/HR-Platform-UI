import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { emptyProcess } from "../../json-mock-api/mockData";
import {
  useGetAllProcessesQuery,
  useSaveProcessMutation,
} from "../../redux/services/process";
import FormCard from "../Common/FormCard";
import TextInput from "../Common/FormInputs/TextInput";
import ProcessSteps from "./ProcessSteps";

function ProcessManagePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const stepsRef = useRef();

  const { data: processes } = useGetAllProcessesQuery();
  const [saveProcess] = useSaveProcessMutation();

  const [state, setState] = useState({
    createModalShow: false,
    process:
      id && processes?.length > 0
        ? getProcessById(processes, id)
        : emptyProcess,
  });

  useEffect(() => {
    if (id && processes?.length > 0) {
      setState({
        process: getProcessById(processes, id) || emptyProcess,
      });
    }
  }, [processes, id]);

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setState({
      ...state,
      process: { ...state.process, [event.target.name]: value },
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const sortedSteps = stepsRef.current.getSortedSteps();
    const process = { ...state.process, steps: sortedSteps };

    saveProcess({ process })
      .then(() => {
        navigate("/processes/");
      })
      .catch((error) => {
        alert("Saving process failed: " + error);
      });
  };

  const title = state.process.id ? "Edit Process" : "Create New Process";

  return (
    <FormCard
      title={title}
      formText={
        <>
          <span className="text-danger">*</span> indicates required fields
        </>
      }
    >
      <form onSubmit={handleSave} className="row gy-3">
        <TextInput
          name="name"
          label="Name"
          value={state.process.name}
          onChange={handleChange}
          required
        />
        <TextInput
          name="description"
          label="Description"
          value={state.process.description}
          onChange={handleChange}
        />
        <ProcessSteps steps={state.process.steps} ref={stepsRef} />
        <button className="btn btn-primary col-6 offset-3" type="submit">
          Save
        </button>
      </form>
    </FormCard>
  );
}

export function getProcessById(processes, id) {
  return processes.find((process) => process.id === id) || null;
}

export default ProcessManagePage;
