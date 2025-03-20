import apiSlice from "../slices/apiSlice";
import { apiTags } from "../tags/tags";

export const rolesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => "/roles",
            providesTags: [apiTags.ROLES],
        }),
        getRoleById: builder.query({
            query: (id) => `/roles/${id}`,
            providesTags: (result, error, id) => [{ type: apiTags.ROLES, id }],
        }),
        createRole: builder.mutation({
            query: (data) => ({
                url: "/roles",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [apiTags.ROLES],
        }),
        updateRole: builder.mutation({
            query: ({ id, data }) => ({
                url: `/roles/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: apiTags.ROLES, id },
            ],
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [apiTags.ROLES],
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRoleByIdQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
} = rolesApi;
