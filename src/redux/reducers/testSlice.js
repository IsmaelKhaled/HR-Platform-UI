import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function testsReducer(state = initialState.tests, action) {
  switch (action.type) {
    case types.LOAD_TESTS_SUCCESS:
      return action.tests;
    case types.CREATE_TEST_SUCCESS:
      return [...state, action.test];
    case types.UPDATE_TEST_SUCCESS:
      return state.map((test) =>
        test.id === action.test.id ? action.test : test
      );
    default:
      return state;
  }
}
