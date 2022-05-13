import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getGroups() {
  return axios.get(`${baseUrl}/groups`);
}

export function addAttribute(group, attr) {
  return axios.put(`${baseUrl}/groups/` + (group.id || ""), {
    ...group,
    attrs: [...group.attrs, attr],
  });
}

export function removeAttribute(group, attr) {
  return axios.put(`${baseUrl}/groups/` + (group.id || ""), {
    ...group,
    attrs: group.attrs.filter((x) => x !== attr),
  });
}

export function createGroup(name) {
  return axios.post(`${baseUrl}/groups`, {
    id: crypto.randomUUID(),
    name: name,
    attrs: [],
  });
}
