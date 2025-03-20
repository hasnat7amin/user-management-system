import React, { useState } from "react";
import { useGetPermissionsQuery } from "../../redux/apis/permissionsSlice";
import PermissionsTable from "./components/PermissionsTable";
import AddPermissionModal from "./components/AddPermissionModal";
import EditPermissionModal from "./components/EditPermissionModal";
import ViewPermissionModal from "./components/ViewPermissionModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { Icon } from "@iconify/react";
import { usePermissions } from "./services/usePermissions";
import Layout from "../../layout/MainLayout";
import { isPermitted } from "../../helpers/isPermitted";
import { UserProfileResponse } from "../../types/types";

const PermissionsPage: React.FC<{ userProfileData: UserProfileResponse}> = ({ userProfileData }) => {
    const { data: permissionsData, isLoading } = useGetPermissionsQuery({});
    const permissions = permissionsData?.data || [];

    // Custom Hook for Handling Permissions
    const { handleAddPermission, handleEditPermission, handleDeletePermission, isCreating,
        isUpdating,
        isDeleting, } = usePermissions();

    // State for modals
    const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState<any>(null);
    const [isEditPermissionOpen, setIsEditPermissionOpen] = useState(false);
    const [isViewPermissionOpen, setIsViewPermissionOpen] = useState(false);
    const [isDeletePermissionOpen, setIsDeletePermissionOpen] = useState(false);

    return (
        <Layout>
            <div className="p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Permissions Management</h1>
                    {isPermitted(userProfileData, "CREATE_PERMISSION") && <button
                        onClick={() => setIsAddPermissionOpen(true)}
                        className="bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
                    >
                        <Icon icon="mdi:plus" className="text-xl" />
                        Add Permission
                    </button>}
                </div>

                {isLoading ? (
                    <p>Loading permissions...</p>
                ) : (
                    <PermissionsTable
                        permissions={permissions}
                        userProfileData={userProfileData}
                        onView={(permission) => {
                            setSelectedPermission(permission);
                            setIsViewPermissionOpen(true);
                        }}
                        onEdit={(permission) => {
                            setSelectedPermission(permission);
                            setIsEditPermissionOpen(true);
                        }}
                        onDelete={(permission) => {
                            setSelectedPermission(permission);
                            setIsDeletePermissionOpen(true);
                        }}
                    />
                )}

                {/* Modals */}
                <AddPermissionModal
                    isOpen={isAddPermissionOpen}
                    isLoading={isCreating}
                    onClose={() => setIsAddPermissionOpen(false)}
                    onSubmit={handleAddPermission}
                />

                <EditPermissionModal
                    isOpen={isEditPermissionOpen}
                    isLoading={isUpdating}
                    onClose={() => setIsEditPermissionOpen(false)}
                    permission={selectedPermission}
                    onSubmit={handleEditPermission}
                />

                <ViewPermissionModal
                    isOpen={isViewPermissionOpen}
                    onClose={() => setIsViewPermissionOpen(false)}
                    permission={selectedPermission}
                />

                <DeleteConfirmationModal
                    isOpen={isDeletePermissionOpen}
                    onClose={() => setIsDeletePermissionOpen(false)}
                    onConfirm={() => {
                        if (selectedPermission?._id) {
                            handleDeletePermission(selectedPermission._id, () => setIsDeletePermissionOpen(false));
                        }
                    }}
                />
            </div>
        </Layout>
    );
};

export default PermissionsPage;
