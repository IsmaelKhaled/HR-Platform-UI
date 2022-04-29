import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function interviewsReducer(
  state = initialState.interviews,
  action
) {
  switch (action.type) {
    case types.LOAD_INTERVIEWS_SUCCESS:
      return action.interviews;
    case types.SAVE_INTERVIEW_SUCCESS:
      return [...state, action.interview];
    default:
      return state;
  }
}
