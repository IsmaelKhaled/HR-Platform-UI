import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getProcesses() {
  return axios.get(`${baseUrl}/processes`);
}

export function saveProcess(process) {
  return axios({
    url: `${baseUrl}/processes/${process.id ? process.id : ""}`,
    method: process.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    data: {
      ...process,
      id: process.id ? process.id : crypto.randomUUID(),
    },
  });
}
