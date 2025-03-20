import { Icon } from "@iconify/react";

interface DeleteRoleModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ isOpen, isLoading, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                <p className="text-gray-300 mt-2">Are you sure you want to delete this role?</p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">Cancel</button>
                    <button onClick={onDelete} disabled={isLoading} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteRoleModal;
