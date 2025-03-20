import React, { useState } from "react";
import { useGetRolesQuery } from "../../redux/apis/rolesSlice";
import RolesTable from "./components/RolesTable";
import DeleteRoleModal from "./components/DeleteRoleModal";
import { Icon } from "@iconify/react";
import { useRoles } from "./services/useRoles";
import Layout from "../../layout/MainLayout";
import AddRoleModal from "./components/AddRoleModal";
import EditRoleModal from "./components/EditRoleModal";
import ViewRoleModal from "./components/ViewRoleModal";
import { isPermitted } from "../../helpers/isPermitted";
import { UserProfileResponse } from "../../types/types";


const RolesPage: React.FC<{ userProfileData: UserProfileResponse}> = ({ userProfileData }) => {
    const { data: rolesData, isLoading } = useGetRolesQuery({});
    const roles = rolesData?.data || [];

    // Import role-related functions from useRoles hook
    const { handleAddRole, handleEditRole, handleDeleteRole, isAddRoleLoading, isEditRoleLoading, isDeleteRoleLoading } = useRoles();

    // State for modals
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const [isViewRoleOpen, setIsViewRoleOpen] = useState(false);
    const [isDeleteRoleOpen, setIsDeleteRoleOpen] = useState(false);

    return (
        <Layout>
            <div className="p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Roles Management</h1>
                    {isPermitted(userProfileData, "CREATE_ROLE") && <button
                        onClick={() => setIsAddRoleOpen(true)}
                        className="bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
                    >
                        <Icon icon="mdi:plus" className="text-xl" />
                        Add Role
                    </button>}
                </div>

                {isLoading ? (
                    <p>Loading roles...</p>
                ) : (
                    <RolesTable
                        userProfileData={userProfileData}
                        roles={roles}
                        onView={(role) => {
                            setSelectedRole(role);
                            setIsViewRoleOpen(true);
                        }}
                        onEdit={(role) => {
                            setSelectedRole(role);
                            setIsEditRoleOpen(true);
                        }}
                        onDelete={(role) => {
                            setSelectedRole(role);
                            setIsDeleteRoleOpen(true);
                        }}
                    />
                )}

                {/* Modals */}
                <AddRoleModal
                    isOpen={isAddRoleOpen}
                    isLoading={isAddRoleLoading}
                    onClose={() => setIsAddRoleOpen(false)}
                    onSubmit={handleAddRole}
                />
                <EditRoleModal
                    isOpen={isEditRoleOpen}
                    isLoading={isEditRoleLoading}
                    onClose={() => setIsEditRoleOpen(false)}
                    role={selectedRole}
                    onSubmit={handleEditRole}
                />
                <ViewRoleModal isOpen={isViewRoleOpen} onClose={() => setIsViewRoleOpen(false)} role={selectedRole} />
                <DeleteRoleModal
                    isOpen={isDeleteRoleOpen}
                    isLoading={isDeleteRoleLoading}
                    onClose={() => setIsDeleteRoleOpen(false)}
                    onDelete={() => handleDeleteRole(selectedRole?._id, () => setIsDeleteRoleOpen(false))}
                />
            </div>
        </Layout>
    );
};

export default RolesPage;
