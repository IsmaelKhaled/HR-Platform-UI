import * as types from "./actionTypes";
import * as interviewApi from "../../api/interviewApi";

export function loadInterviewsSuccess(interviews) {
  return { type: types.LOAD_INTERVIEWS_SUCCESS, interviews };
}

export function createInterviewSuccess(interview) {
  return { type: types.CREATE_INTERVIEW_SUCCESS, interview };
}

export function updateInterviewSuccess(interview) {
  return { type: types.UPDATE_INTERVIEW_SUCCESS, interview };
}

export function loadInterviews() {
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
        interview.id
          ? dispatch(updateInterviewSuccess(savedInterview))
          : dispatch(createInterviewSuccess(savedInterview));
      })
      .catch((error) => {
        throw error;
      });
  };
}
