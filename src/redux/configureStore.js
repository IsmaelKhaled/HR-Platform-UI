import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./reducers/groupSlice";
import interviewsReducer from "./reducers/interviewSlice";
import testsReducer from "./reducers/testSlice";

const store = configureStore({
  // root reducer
  reducer: {
    groups: groupsReducer,
    interviews: interviewsReducer,
    tests: testsReducer,
  },
});

export default store;
