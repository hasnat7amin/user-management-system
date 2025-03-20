import React from "react";
import { Icon } from "@iconify/react";
import { UserProfileResponse } from "../../../types/types";
import { isPermitted } from "../../../helpers/isPermitted";

interface Role {
    _id: string;
    name: string;
}

interface RolesTableProps {
    roles: Role[];
    onView: (role: Role) => void;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
    userProfileData: UserProfileResponse
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, onView, onEdit, onDelete, userProfileData }) => {
    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
            <table className="w-full text-white border-collapse border border-gray-600">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="py-2 px-3">Role Name</th>
                        <th className="py-2 px-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <tr key={role._id} className="border-b border-gray-700">
                                <td className="py-2 px-3">{role.name}</td>
                                <td className="py-2 px-3 flex justify-center gap-3">
                                    {isPermitted(userProfileData, "VIEW_ROLE") && <button onClick={() => onView(role)}>
                                        <Icon icon="mdi:eye" className="text-blue-400 text-xl" />
                                    </button>}
                                    {isPermitted(userProfileData, "UPDATE_ROLE") && <button onClick={() => onEdit(role)}>
                                        <Icon icon="mdi:pencil" className="text-yellow-400 text-xl" />
                                    </button>}
                                    {isPermitted(userProfileData, "DELETE_ROLE") && <button onClick={() => onDelete(role)}>
                                        <Icon icon="mdi:trash-can" className="text-red-400 text-xl" />
                                    </button>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-center py-4 text-gray-400">
                                No roles found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RolesTable;
