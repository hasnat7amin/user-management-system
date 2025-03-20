import React from "react";

import { Icon } from "@iconify/react";

interface ViewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any | null;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, user }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">User Details</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* User Information */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    <div>
                        <span className="text-gray-400">Name:</span>
                        <p className="text-white font-medium">{user.name}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Email:</span>
                        <p className="text-white font-medium">{user.email}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Role:</span>
                        <p className="text-white font-medium">{user.role?.name}</p>
                    </div>

                    <div>
                        <span className="text-gray-400">Permissions:</span>
                        <ul className="text-white list-disc pl-5 space-y-1">
                            {user.role?.permissions.map((perm: any, index: any) => (
                                <li key={index}>{perm?.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span className="text-gray-400">Created At:</span>
                        <p className="text-white font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUserModal;
