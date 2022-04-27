// import { handleResponse, handleError } from "./apiUtils";

export function getGroups() {
  return Promise.resolve([
    {
      id: "17fa833a-c6cc-4988-aba0-78c010178cc9",
      name: "Technical attributes",
      attrs: ["C++", "C#"],
    },
    {
      id: "9b52ab19-10eb-4f47-9106-a3ca54c5c0f1",
      name: "Soft skills",
      attrs: ["Intelligence", "Humor"],
    },
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
