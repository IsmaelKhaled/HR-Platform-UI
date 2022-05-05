import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getTests() {
  return axios.get(`${baseUrl}/tests`).then(handleResponse).catch(handleError);
}
