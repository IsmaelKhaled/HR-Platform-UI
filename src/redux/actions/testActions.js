import * as types from "./actionTypes";
import * as testApi from "../../api/testApi";

export function loadTestsSuccess(tests) {
  return { type: types.LOAD_TESTS_SUCCESS, tests };
}

export function createTestSuccess(test) {
  return { type: types.CREATE_TEST_SUCCESS, test };
}

export function updateTestSuccess(test) {
  return { type: types.UPDATE_TEST_SUCCESS, test };
}

export function loadTests() {
  return function (dispatch) {
    return testApi
      .getTests()
      .then((tests) => {
        dispatch(loadTestsSuccess(tests));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveTest(test) {
  return function (dispatch) {
    return testApi
      .saveTest(test)
      .then((savedTest) => {
        test.id
          ? dispatch(updateTestSuccess(savedTest))
          : dispatch(createTestSuccess(savedTest));
      })
      .catch((error) => {
        throw error;
      });
  };
}
