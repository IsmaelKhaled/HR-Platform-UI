import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getInterviews() {
  return axios.get(`${baseUrl}/interviews`);
}

export function saveInterview(interview) {
  return axios({
    url: `${baseUrl}/interviews/${interview.id ? interview.id : ""}`,
    method: interview.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    data: {
      ...interview,
      id: interview.id ? interview.id : crypto.randomUUID(),
    },
  });
}
