import { Icon } from "@iconify/react";

interface ViewRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: { name: string; permissions: { _id: string; name: string }[] } | null;
}

const ViewRoleModal: React.FC<ViewRoleModalProps> = ({ isOpen, onClose, role }) => {
    if (!isOpen || !role) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Role Details</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Role Name */}
                <div className="mt-4">
                    <p className="text-gray-300">Role Name:</p>
                    <p className="text-lg font-semibold">{role.name}</p>
                </div>

                {/* Permissions */}
                <div className="mt-4">
                    <p className="text-gray-300">Permissions:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {role.permissions.map((perm) => (
                            <span key={perm._id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                {perm.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewRoleModal;
