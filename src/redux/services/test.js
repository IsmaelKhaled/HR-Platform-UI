import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, fetchRelatedUsers } from "./serviceUtils";
import * as testApi from "../../api/testApi";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const testService = createApi({
  reducerPath: "testApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/tests` }),
  endpoints: (builder) => ({
    getAllTests: builder.query({
      queryFn: () => fetchRelatedUsers(testApi.getTests()),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tests", id })),
              { type: "Tests", id: "LIST" },
            ]
          : [{ type: "Tests", id: "LIST" }],
    }),
    saveTest: builder.mutation({
      queryFn: (args) => testApi.saveTest(args.test),
      invalidatesTags: (result, error, { id }) => [{ type: "Tests", id }],
    }),
    deleteTest: builder.mutation({
      queryFn: (args) => testApi.deleteTest(args.test),
      invalidatesTags: (result, error, { id }) => [{ type: "Tests", id }],
    }),
  }),
});

export const {
  useGetAllTestsQuery,
  useSaveTestMutation,
  useDeleteTestMutation,
} = testService;
