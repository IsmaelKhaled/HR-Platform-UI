import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./serviceUtils";
import * as groupApi from "../../api/groupApi";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const groupService = createApi({
  reducerPath: "groupApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/groups` }),
  endpoints: (builder) => ({
    getAllGroups: builder.query({
      queryFn: () =>
        groupApi.getGroups().then((data) => {
          return { data };
        }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Groups", id })),
              { type: "Groups", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Groups', id: 'LIST' }` is invalidated
            [{ type: "Groups", id: "LIST" }],
    }),
    createGroup: builder.mutation({
      queryFn: (args) =>
        groupApi.createGroup(args.name).then((data) => {
          return { data };
        }),
      invalidatesTags: () => [{ type: "Groups", id: "LIST" }],
    }),
    addGroupAttribute: builder.mutation({
      queryFn: (args) =>
        groupApi.addAttribute(args.group, args.attr).then((data) => {
          return { data };
        }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),
    deleteGroupAttribute: builder.mutation({
      queryFn: (args) =>
        groupApi.removeAttribute(args.group, args.attr).then((data) => {
          return { data };
        }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),
  }),
});

export const {
  useGetAllGroupsQuery,
  useCreateGroupMutation,
  useAddGroupAttributeMutation,
  useDeleteGroupAttributeMutation,
} = groupService;
