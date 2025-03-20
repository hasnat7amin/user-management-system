import { usePostRegisterMutation } from "../../../redux/apis/authSlice";
import { toast } from "react-toastify";
import apiSlice from "../../../redux/slices/apiSlice";
import { useDispatch } from "react-redux";
import { apiTags } from "../../../redux/tags/tags";
import { useDeleteUserMutation, useUpdateUserMutation } from "../../../redux/apis/userSlice";

export const useUser = () => {
    const dispatch = useDispatch();
    const [postRegister, { isLoading: isAddUserLoading }] = usePostRegisterMutation();
    const [updateUser, { isLoading: isEditUserLoading }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();

    const handleAddUser = async (values: { name: string; email: string; password: string }, onSuccess: () => void) => {
        try {
            const response = await postRegister(values).unwrap();
            toast.success(response.message || "User added successfully!");
            onSuccess(); // Close modal after success
            dispatch(apiSlice.util.invalidateTags([apiTags.USERS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add user");
        }
    };

    const handleEditUser = async (id: string, values: { name: string; role: string }, onSuccess: () => void) => {
        try {
            const response = await updateUser({ id: id, data: values }).unwrap();
            toast.success(response.message || "User updated successfully!");
            onSuccess(); // Close modal after success
            dispatch(apiSlice.util.invalidateTags([apiTags.USERS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add user");
        }
    };

    const handleDeleteUser = async (id: string, onSuccess: () => void) => {
        try {
            const response = await deleteUser(id).unwrap();
            toast.success(response.message || "User deleted successfully!");
            onSuccess(); // Close modal after success
            dispatch(apiSlice.util.invalidateTags([apiTags.USERS]));
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete user");
        }
    }

    return { handleAddUser, handleEditUser, handleDeleteUser, isAddUserLoading, isEditUserLoading, isDeleteLoading };
};
