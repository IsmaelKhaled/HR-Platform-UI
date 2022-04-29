import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./reducers/groupSlice";
import interviewsReducer from "./reducers/interviewSlice";

const store = configureStore({
  // root reducer
  reducer: {
    groups: groupsReducer,
    interviews: interviewsReducer,
  },
});

export default store;
