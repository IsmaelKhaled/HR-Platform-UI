import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getTests() {
  return axios.get(`${baseUrl}/tests`).then(handleResponse).catch(handleError);
}

export function saveTest(test) {
  return axios({
    url: `${baseUrl}/tests/${test.id ? test.id : ""}`,
    method: test.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    data: {
      ...test,
      id: test.id ? test.id : crypto.randomUUID(),
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
