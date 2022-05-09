import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getProcesses() {
  return axios
    .get(`${baseUrl}/processes`)
    .then(handleResponse)
    .catch(handleError);
}
