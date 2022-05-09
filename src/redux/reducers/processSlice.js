import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function processesReducer(
  state = initialState.processes,
  action
) {
  switch (action.type) {
    case types.LOAD_PROCESSES_SUCCESS:
      return action.processes;
    // case types.CREATE_INTERVIEW_SUCCESS:
    //   return [...state, action.interview];
    // case types.UPDATE_INTERVIEW_SUCCESS:
    //   return state.map((interview) =>
    //     interview.id === action.interview.id ? action.interview : interview
    //   );
    default:
      return state;
  }
}
