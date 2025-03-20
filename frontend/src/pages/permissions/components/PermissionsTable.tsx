import React from "react";
import { Icon } from "@iconify/react";
import { isPermitted } from "../../../helpers/isPermitted";
import { Permissions, UserProfileResponse } from "../../../types/types";

interface PermissionsTableProps {
    permissions: Permissions[];
    onView: (permission: any) => void;
    onEdit: (permission: any) => void;
    onDelete: (permission: any) => void;
    userProfileData: UserProfileResponse;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions, onView, onEdit, onDelete, userProfileData }) => {
    return (
        <div className="bg-gray-900 p-4 rounded-lg">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="p-2">Permission Name</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map((permission) => (
                        <tr key={permission._id} className="border-b border-gray-700">
                            <td className="p-2">{permission.name}</td>
                            <td className="p-2 flex justify-center gap-2">
                                {isPermitted(userProfileData, "VIEW_PERMISSION") && <button onClick={() => onView(permission)}>
                                    <Icon icon="mdi:eye" className="text-xl text-green-400" />
                                </button>}
                                {isPermitted(userProfileData, "UPDATE_PERMISSION") && <button onClick={() => onEdit(permission)}>
                                    <Icon icon="mdi:pencil" className="text-xl text-yellow-400" />
                                </button>}
                                {isPermitted(userProfileData, "DELETE_PERMISSION") && <button onClick={() => onDelete(permission)}>
                                    <Icon icon="mdi:trash-can" className="text-xl text-red-400" />
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermissionsTable;
