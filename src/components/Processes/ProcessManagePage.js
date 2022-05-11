import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";

import * as processActions from "../../redux/actions/processActions";
import { emptyProcess } from "../../json-mock-api/mockData";
import ProcessForm from "./ProcessForm";

function ProcessManagePage({ processes, actions }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState({
    createModalShow: false,
    process: useSelector((state) =>
      id && state.processes?.length > 0
        ? getProcessById(state.processes, id)
        : emptyProcess
    ),
  });

  useEffect(() => {
    if (!processes) {
      actions.loadProcesses().catch((error) => {
        alert("Loading processes failed: " + error);
      });
    }
  }, [actions, processes]);

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
    actions
      .saveProcess(state.process)
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

function mapStateToProps(state) {
  return {
    processes: state.processes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveProcess: bindActionCreators(processActions.saveProcess, dispatch),
      loadProcesses: bindActionCreators(processActions.loadProcesses, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessManagePage);
