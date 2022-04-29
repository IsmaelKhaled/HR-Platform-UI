import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getGroups() {
  return fetch(`${baseUrl}/groups`).then(handleResponse).catch(handleError);
}

export function addAttribute(group, attr) {
  return fetch(`${baseUrl}/groups/` + (group.id || ""), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...group,
      attrs: [...group.attrs, attr],
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function removeAttribute(group, attr) {
  return fetch(`${baseUrl}/groups/` + (group.id || ""), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...group,
      attrs: group.attrs.filter((x) => x !== attr),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createGroup(name) {
  return fetch(`${baseUrl}/groups`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      name: name,
      attrs: [],
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
