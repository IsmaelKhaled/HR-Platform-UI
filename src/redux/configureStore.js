import { configureStore } from "@reduxjs/toolkit";

import { groupService } from "./services/group";
import { interviewService } from "./services/interview";
import { processService } from "./services/process";
import { testService } from "./services/test";

const store = configureStore({
  // root reducer
  reducer: {
    [groupService.reducerPath]: groupService.reducer,
    [interviewService.reducerPath]: interviewService.reducer,
    [testService.reducerPath]: testService.reducer,
    [processService.reducerPath]: processService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      groupService.middleware,
      interviewService.middleware,
      testService.middleware,
      processService.middleware,
    ]),
});

export default store;
