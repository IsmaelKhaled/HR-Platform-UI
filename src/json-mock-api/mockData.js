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

const tests = [
  {
    id: "0ab258f3-6967-4378-976a-ff2d0c316b51",
    name: "PHP Test",
    acceptanceScore: 65,
    maxScore: 100,
    duration: 60,
    URL: "https://www.google.com",
  },
  {
    id: "89be8a88-91ad-4180-93ee-c16217347e95",
    name: "React.js Test",
    acceptanceScore: 30,
    maxScore: 50,
    duration: 45,
    URL: "https://www.react.js",
  },
];

const emptyInterview = {
  id: "",
  name: "",
  groups: { focus: [], additional: [] },
};

const emptyTest = {
  id: "",
  name: "",
  acceptanceScore: null,
  maxScore: null,
  duration: null,
  URL: "",
};
// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  interviews,
  groups,
  emptyInterview,
  tests,
  emptyTest,
};
