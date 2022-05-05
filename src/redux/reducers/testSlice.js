import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function testsReducer(state = initialState.tests, action) {
  switch (action.type) {
    case types.LOAD_TESTS_SUCCESS:
      return action.tests;
    default:
      return state;
  }
}
