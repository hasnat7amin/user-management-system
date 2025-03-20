import apiSlice from "../slices/apiSlice";
import { apiTags } from "../tags/tags";


export const permissionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => "/permissions",
      providesTags: [apiTags.PERMISSIONS],
    }),
    getPermissionById: builder.query({
      query: (id) => `/permissions/${id}`,
      providesTags: (result, error, id) => [{ type: apiTags.PERMISSIONS, id }],
    }),
    createPermission: builder.mutation({
      query: (data) => ({
        url: "/permissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [apiTags.PERMISSIONS],
    }),
    updatePermission: builder.mutation({
      query: ({ id, data }) => ({
        url: `/permissions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: apiTags.PERMISSIONS, id },
      ],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [apiTags.PERMISSIONS],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionsApi;
