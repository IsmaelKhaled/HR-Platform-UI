import * as types from "./actionTypes";
import * as processApi from "../../api/processApi";

export function loadProcessesSuccess(processes) {
  return { type: types.LOAD_PROCESSES_SUCCESS, processes };
}

export function updateProcessSuccess(process) {
  return { type: types.UPDATE_PROCESS_SUCCESS, process };
}

export function createProcessSuccess(process) {
  return { type: types.CREATE_PROCESS_SUCCESS, process };
}

export function loadProcesses() {
  return function (dispatch) {
    return processApi
      .getProcesses()
      .then((processes) => {
        dispatch(loadProcessesSuccess(processes));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveProcess(process) {
  return function (dispatch) {
    return processApi
      .saveProcess(process)
      .then((savedProcess) => {
        process.id
          ? dispatch(updateProcessSuccess(savedProcess))
          : dispatch(createProcessSuccess(savedProcess));
      })
      .catch((error) => {
        throw error;
      });
  };
}
