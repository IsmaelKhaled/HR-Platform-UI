import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./reducers/groupSlice";
import interviewsReducer from "./reducers/interviewSlice";
import processesReducer from "./reducers/processSlice";
import testsReducer from "./reducers/testSlice";

const store = configureStore({
  // root reducer
  reducer: {
    groups: groupsReducer,
    interviews: interviewsReducer,
    tests: testsReducer,
    processes: processesReducer,
  },
});

export default store;
