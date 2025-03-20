import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCreatePermissionMutation, useDeletePermissionMutation, useUpdatePermissionMutation } from "../../../redux/apis/permissionsSlice";
import apiSlice from "../../../redux/slices/apiSlice";
import { apiTags } from "../../../redux/tags/tags";


export const usePermissions = () => {
    const dispatch = useDispatch();
    const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
    const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
    const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

    const handleAddPermission = async (values: { name: string }, onSuccess: () => void) => {
        try {
            const response = await createPermission(values).unwrap();
            toast.success(response.message || "Permission added successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.PERMISSIONS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add permission");
        }
    };

    const handleEditPermission = async (id: string, values: { name: string }, onSuccess: () => void) => {
        try {
            const response = await updatePermission({ id, data: values }).unwrap();
            toast.success(response.message || "Permission updated successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.PERMISSIONS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update permission");
        }
    };

    const handleDeletePermission = async (id: string, onSuccess: () => void) => {
        try {
            const response = await deletePermission(id).unwrap();
            toast.success(response.message || "Permission deleted successfully!");
            onSuccess();
            dispatch(apiSlice.util.invalidateTags([apiTags.PERMISSIONS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete permission");
        }
    };

    return {
        handleAddPermission,
        handleEditPermission,
        handleDeletePermission,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
