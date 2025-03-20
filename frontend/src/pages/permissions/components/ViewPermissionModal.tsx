import { Icon } from "@iconify/react";

interface ViewPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    permission: { name: string; description: string } | null;
}

const ViewPermissionModal: React.FC<ViewPermissionModalProps> = ({ isOpen, onClose, permission }) => {
    if (!isOpen || !permission) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Permission Details</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Details */}
                <div className="mt-4">
                    <p><strong>Name:</strong> {permission.name}</p>
                    <p><strong>Description:</strong> {permission.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewPermissionModal;
