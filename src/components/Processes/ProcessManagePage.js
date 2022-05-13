import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { emptyProcess } from "../../json-mock-api/mockData";
import ProcessForm from "./ProcessForm";
import {
  useGetAllProcessesQuery,
  useSaveProcessMutation,
} from "../../redux/services/process";

function ProcessManagePage() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const setSteps = (steps) => {
    setState({ process: { ...state.process, steps } });
  };

  const handleSave = (e) => {
    e.preventDefault();

    saveProcess({ process: state.process })
      .then(() => {
        navigate("/processes/");
      })
      .catch((error) => {
        alert("Saving process failed: " + error);
      });
  };

  return (
    <ProcessForm
      process={state.process}
      onSubmit={handleSave}
      onChange={handleChange}
      setSteps={setSteps}
    />
  );
}

export function getProcessById(processes, id) {
  return processes.find((process) => process.id === id) || null;
}

export default ProcessManagePage;
