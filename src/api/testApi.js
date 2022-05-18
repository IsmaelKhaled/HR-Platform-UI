import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getTests() {
  return axios.get(`${baseUrl}/tests`);
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
  });
}

export function deleteTest(test) {
  return axios({
    url: `${baseUrl}/tests/${test.id}`,
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
}