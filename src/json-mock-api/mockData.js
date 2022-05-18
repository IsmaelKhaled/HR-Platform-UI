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
    createdById: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
  },
  {
    id: "17fa833a-c6cc-4988-aba0-78c010178cd8",
    name: "Backend Interview",
    groups: {
      focus: ["17fa833a-c6cc-4988-aba0-78c010178cc8"],
      additional: ["9b52ab19-10eb-4f47-9106-a3ca54c5c0f1"],
    },
    createdById: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
  },
];

const tests = [
  {
    id: "0ab258f3-6967-4378-976a-ff2d0c316b51",
    name: "PHP Test",
    acceptanceScore: 65,
    maxScore: 100,
    duration: 60,
    url: "https://www.google.com",
    createdById: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
  },
  {
    id: "89be8a88-91ad-4180-93ee-c16217347e95",
    name: "React.js Test",
    acceptanceScore: 30,
    maxScore: 50,
    duration: 45,
    url: "https://www.react.js",
    createdById: "78781419-aaaf-427d-8966-ae507fb985c2",
  },
  {
    id: "1ab258f3-6967-4378-976a-ff2d0c316b51",
    name: "Vue.js Test",
    acceptanceScore: 65,
    maxScore: 100,
    duration: 60,
    url: "https://www.google.com",
    createdById: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
  },
];

const processes = [
  {
    id: "c1024b53-2cff-459a-ba89-9fe667bbc51a",
    name: "Junior Frontend Developer Process",
    description:
      "The process for a Junior Frontend Developer position at Luftborn.",
    steps: {
      tests: [{ id: "0ab258f3-6967-4378-976a-ff2d0c316b51", priority: 1 }],
      interviews: [{ id: "17fa833a-c6cc-4988-aba0-78c010178cc9", priority: 2 }],
    },
    createdById: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
  },
  {
    id: "481148d3-d67e-492d-a7bd-660c3a73d9f0",
    name: "Junior Backend Developer Process",
    description:
      "The process for a Junior Backend Developer position at Luftborn.",
    steps: {
      tests: [{ id: "89be8a88-91ad-4180-93ee-c16217347e95", priority: 1 }],
      interviews: [{ id: "17fa833a-c6cc-4988-aba0-78c010178cd8", priority: 2 }],
    },
    createdById: "78781419-aaaf-427d-8966-ae507fb985c2",
  },
];

const users = [
  {
    id: "78781419-aaaf-427d-8966-ae507fb985c2",
    name: "Hatem Ashraf",
    email: "ismael.khaled1@gmail.com",
    normalizedEmail: "ISMAEL.KHALED1@GMAIL.COM",
    externalProvider: "Google",
    createdAt: "2022-05-18 08:36:09.516563",
    recruiter: "{}",
  },
  {
    id: "b71f9d5d-bcc1-4630-900b-728c30b6a3bb",
    name: "Ismael Khaled",
    email: "ikh@luftborn.com",
    normalizedEmail: "IKH@LUFTBORN.COM",
    externalProvider: "Google",
    createdAt: "2022-05-18 08:32:18.318077",
    recruiter: "{}",
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
  acceptanceScore: "",
  maxScore: "",
  duration: "",
  url: "",
  createdById: "",
};

const emptyProcess = {
  id: "",
  name: "",
  description: "",
  steps: {
    tests: [],
    interviews: [],
  },
};
// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  interviews,
  groups,
  emptyInterview,
  tests,
  users,
  emptyTest,
  processes,
  emptyProcess,
};
