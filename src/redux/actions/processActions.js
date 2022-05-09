import * as types from "./actionTypes";
import * as processApi from "../../api/processApi";

export function loadProcessesSuccess(processes) {
  return { type: types.LOAD_PROCESSES_SUCCESS, processes };
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
