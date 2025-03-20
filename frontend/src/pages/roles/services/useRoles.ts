import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import apiSlice from "../../../redux/slices/apiSlice";
import { apiTags } from "../../../redux/tags/tags";
import {
    useGetRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} from "../../../redux/apis/rolesSlice";

export const useRoles = () => {
    const dispatch = useDispatch();

    // Queries & Mutations
    const { data: rolesData, isLoading: isRolesLoading } = useGetRolesQuery({});
    const [createRole, { isLoading: isAddRoleLoading }] = useCreateRoleMutation();
    const [updateRole, { isLoading: isEditRoleLoading }] = useUpdateRoleMutation();
    const [deleteRole, { isLoading: isDeleteRoleLoading }] = useDeleteRoleMutation();

    // Add Role
    const handleAddRole = async (values: { name: string; permissions: string[] }, onSuccess: () => void) => {
        try {
            const response = await createRole(values).unwrap();
            toast.success(response.message || "Role added successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.ROLES]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add role");
        }
    };

    // Edit Role
    const handleEditRole = async (id: string, values: { name: string; permissions: string[] }, onSuccess: () => void) => {
        try {
            const response = await updateRole({ id, data: values }).unwrap();
            toast.success(response.message || "Role updated successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.ROLES]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update role");
        }
    };

    // Delete Role
    const handleDeleteRole = async (id: string, onSuccess: () => void) => {
        try {
            const response = await deleteRole(id).unwrap();
            toast.success(response.message || "Role deleted successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.ROLES]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete role");
        }
    };

    return {
        rolesData,
        isRolesLoading,
        handleAddRole,
        handleEditRole,
        handleDeleteRole,
        isAddRoleLoading,
        isEditRoleLoading,
        isDeleteRoleLoading
    };
};
