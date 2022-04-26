// import { handleResponse, handleError } from "./apiUtils";

export function getGroups() {
  return Promise.resolve([
    { id: 1, name: "Technical attributes", attrs: ["C++", "C#"] },
    { id: 0, name: "Soft skills", attrs: ["Intelligence", "Humor"] },
  ]);
  //   return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addAttribute(group, attr) {
  return Promise.resolve({
    ...group,
    attrs: [...group.attrs, attr],
  });
}

export function removeAttribute(group, attr) {
  return Promise.resolve({
    ...group,
    attrs: group.attrs.filter((x) => x !== attr),
  });
}
