import { Icon } from "@iconify/react";
import { useDeleteUserMutation } from "../../../redux/apis/userSlice";

interface DeleteUserModalProps {
    onSubmit: (id: string, onSuccess: () => void) => void;
    isDeleteLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
    user: any | null;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, user, onSubmit, isDeleteLoading }) => {
    if (!isOpen || !user) return null;

    // Delete User Mutation


    // Handle delete user
    const handleDeleteBtn = async () => {
        try {
            await onSubmit(user._id, onClose)

        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Confirm Delete</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Message */}
                <p className="mt-4 text-gray-300">
                    Are you sure you want to delete <span className="font-semibold">{user.name}</span>? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                        Cancel
                    </button>
                    <button onClick={handleDeleteBtn} disabled={isDeleteLoading} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
                        {isDeleteLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
