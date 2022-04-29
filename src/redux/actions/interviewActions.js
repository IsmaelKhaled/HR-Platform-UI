import * as types from "./actionTypes";
import * as interviewApi from "../../api/interviewApi";

export function loadInterviewsSuccess(interviews) {
  return { type: types.LOAD_INTERVIEWS_SUCCESS, interviews };
}

export function saveInterviewSuccess(interview) {
  return { type: types.SAVE_INTERVIEW_SUCCESS, interview };
}

export function loadGroups() {
  return function (dispatch) {
    return interviewApi
      .getInterviews()
      .then((interviews) => {
        dispatch(loadInterviewsSuccess(interviews));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveInterview(interview) {
  return function (dispatch) {
    return interviewApi
      .saveInterview(interview)
      .then((savedInterview) => {
        dispatch(saveInterviewSuccess(savedInterview));
      })
      .catch((error) => {
        throw error;
      });
  };
}
