import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  CommonResponse,
  ErrorMessage,
  RepositoryType,
  UserType,
} from "../../types/types";

export const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/search",
  }) as BaseQueryFn<string, unknown, ErrorMessage, unknown>,
  endpoints: (builder) => ({
    getUsers: builder.query<CommonResponse<UserType[]>, string | void>({
      query(params) {
        return `/users?${params}`;
      },
    }),
    getRepository: builder.query<
      CommonResponse<RepositoryType[]>,
      string | void
    >({
      query(params) {
        return `/repositories?${params}`;
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetRepositoryQuery } = apiSlice;
