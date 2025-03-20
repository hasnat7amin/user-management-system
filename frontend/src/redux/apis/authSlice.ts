import apiSlice from "../slices/apiSlice";
import { apiTags } from "../tags/tags";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [apiTags.PROFILE],
    }),
    postRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [apiTags.PROFILE],
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;
