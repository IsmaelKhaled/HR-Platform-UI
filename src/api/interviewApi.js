import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getInterviews() {
  return fetch(`${baseUrl}/interviews`).then(handleResponse).catch(handleError);
}

export function saveInterview(interview) {
  return fetch(`${baseUrl}/interviews`, {
    method: interview.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...interview,
      id: interview.id ? interview.id : crypto.randomUUID(),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
