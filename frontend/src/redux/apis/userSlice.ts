import apiSlice from "../slices/apiSlice";
import { apiTags } from "../tags/tags";


export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: [apiTags.USERS],
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: apiTags.USERS, id }],
        }),
        getProfile: builder.query({
            query: () => "/users/profile",
            providesTags: [apiTags.PROFILE],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: apiTags.USERS, id }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [apiTags.USERS],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetProfileQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;
