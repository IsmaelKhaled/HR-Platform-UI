import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./reducers/groupSlice";

const store = configureStore({
  // root reducer
  reducer: {
    groups: groupsReducer,
  },
});

export default store;
