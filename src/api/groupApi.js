import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getGroups() {
  return axios.get(`${baseUrl}/groups`).then(handleResponse).catch(handleError);
}

export function addAttribute(group, attr) {
  return axios
    .put(`${baseUrl}/groups/` + (group.id || ""), {
      ...group,
      attrs: [...group.attrs, attr],
    })
    .then(handleResponse)
    .catch(handleError);
}

export function removeAttribute(group, attr) {
  return axios
    .put(`${baseUrl}/groups/` + (group.id || ""), {
      ...group,
      attrs: group.attrs.filter((x) => x !== attr),
    })
    .then(handleResponse)
    .catch(handleError);
}

export function createGroup(name) {
  return axios
    .post(`${baseUrl}/groups`, {
      id: crypto.randomUUID(),
      name: name,
      attrs: [],
    })
    .then(handleResponse)
    .catch(handleError);
}
