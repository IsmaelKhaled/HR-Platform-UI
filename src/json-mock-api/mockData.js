const groups = [
  {
    id: "17fa833a-c6cc-4988-aba0-78c010178cc8",
    name: "Technical attributes",
    attrs: ["C++", "C#"],
  },
  {
    id: "9b52ab19-10eb-4f47-9106-a3ca54c5c0f1",
    name: "Soft skills",
    attrs: ["Intelligence", "Humor"],
  },
];

const interviews = [
  {
    id: "17fa833a-c6cc-4988-aba0-78c010178cc9",
    name: "Frontend Interview",
    groups: {
      focus: ["17fa833a-c6cc-4988-aba0-78c010178cc8"],
      additional: ["9b52ab19-10eb-4f47-9106-a3ca54c5c0f1"],
    },
  },
  {
    id: "17fa833a-c6cc-4988-aba0-78c010178cd8",
    name: "Backend Interview",
    groups: {
      focus: ["17fa833a-c6cc-4988-aba0-78c010178cc8"],
      additional: ["9b52ab19-10eb-4f47-9106-a3ca54c5c0f1"],
    },
  },
];

const emptyInterview = {
  id: "",
  name: "",
  groups: { focus: [], additional: [] },
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  interviews,
  groups,
  emptyInterview,
};
