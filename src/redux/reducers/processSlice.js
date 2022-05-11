import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function processesReducer(
  state = initialState.processes,
  action
) {
  switch (action.type) {
    case types.LOAD_PROCESSES_SUCCESS:
      return action.processes;
    case types.CREATE_PROCESS_SUCCESS:
      return [...state, action.process];
    case types.UPDATE_PROCESS_SUCCESS:
      return state.map((process) =>
        process.id === action.process.id ? action.process : process
      );
    default:
      return state;
  }
}
