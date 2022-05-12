import { configureStore } from "@reduxjs/toolkit";

import processesReducer from "./reducers/processSlice";
import testsReducer from "./reducers/testSlice";

import { groupService } from "./services/group";
import { interviewService } from "./services/interview";

const store = configureStore({
  // root reducer
  reducer: {
    [groupService.reducerPath]: groupService.reducer,
    [interviewService.reducerPath]: interviewService.reducer,
    tests: testsReducer,
    processes: processesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      groupService.middleware,
      interviewService.middleware,
    ]),
});

export default store;
