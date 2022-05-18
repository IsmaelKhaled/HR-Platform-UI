import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, fetchRelatedUsers } from "./serviceUtils";
import * as processApi from "../../api/processApi";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const processService = createApi({
  reducerPath: "processApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/processes` }),
  endpoints: (builder) => ({
    getAllProcesses: builder.query({
      queryFn: () => fetchRelatedUsers(processApi.getProcesses()),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Processes", id })),
              { type: "Processes", id: "LIST" },
            ]
          : [{ type: "Processes", id: "LIST" }],
    }),
    saveProcess: builder.mutation({
      queryFn: (args) => processApi.saveProcess(args.process),
      invalidatesTags: (result, error, { id }) => [{ type: "Processes", id }],
    }),
    deleteProcess: builder.mutation({
      queryFn: (args) => processApi.deleteProcess(args.process),
      invalidatesTags: (result, error, { id }) => [{ type: "Processes", id }],
    }),
  }),
});

export const {
  useGetAllProcessesQuery,
  useSaveProcessMutation,
  useDeleteProcessMutation,
} = processService;
