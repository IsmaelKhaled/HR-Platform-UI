import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./serviceUtils";
import * as interviewApi from "../../api/interviewApi";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const interviewService = createApi({
  reducerPath: "interviewApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/interviews` }),
  endpoints: (builder) => ({
    getAllInterviews: builder.query({
      queryFn: () =>
        interviewApi.getInterviews().then((data) => {
          return { data };
        }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Interviews", id })),
              { type: "Interviews", id: "LIST" },
            ]
          : [{ type: "Interviews", id: "LIST" }],
    }),
    saveInterview: builder.mutation({
      queryFn: (args, ...rest) =>
        interviewApi.saveInterview(args.interview).then((data) => {
          return { data };
        }),
      invalidatesTags: (result, error, { id }) => [{ type: "Interviews", id }],
    }),
  }),
});

export const { useGetAllInterviewsQuery, useSaveInterviewMutation } =
  interviewService;
