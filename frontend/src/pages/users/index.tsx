import React, { useState } from 'react'
import Layout from '../../layout/MainLayout'
import UserTable from './components/UserTable';
import AddUserModal from './components/AddUserModal';
import { useUser } from './services/useUser';
import ViewUserModal from './components/ViewUserModal';
import EditUserModal from './components/EditUserModal';
import DeleteUserModal from './components/DeleteUserModal';
import { isPermitted } from '../../helpers/isPermitted';

function Users({ userProfileData }: any) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const { handleAddUser, handleEditUser, handleDeleteUser, isAddUserLoading, isEditUserLoading, isDeleteLoading } = useUser();


    return (
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-white">User Management</h2>
                    {isPermitted(userProfileData, "CREATE_USERS") && <button className="bg-blue-500 px-4 py-2 text-white rounded" onClick={() => setAddModalOpen(true)}>
                        Add User
                    </button>}
                </div>

                <UserTable
                    onView={(user: React.SetStateAction<null>) => {
                        setSelectedUser(user);
                        setViewModalOpen(true);
                    }}
                    onEdit={(user: React.SetStateAction<null>) => {
                        setSelectedUser(user);
                        setEditModalOpen(true);
                    }}
                    onDelete={(user: React.SetStateAction<null>) => {
                        setSelectedUser(user);
                        setDeleteModalOpen(true);
                    }}
                    userProfileData={userProfileData}
                />

                {isViewModalOpen && <ViewUserModal isOpen={isViewModalOpen} user={selectedUser} onClose={() => setViewModalOpen(false)} />}
                {isEditModalOpen && <EditUserModal isEditUserLoading={isEditUserLoading} onSubmit={handleEditUser} isOpen={isEditModalOpen} user={selectedUser} onClose={() => setEditModalOpen(false)} />}
                {isAddModalOpen && <AddUserModal isAddUserLoading={isAddUserLoading} onSubmit={handleAddUser} isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />}
                {isDeleteModalOpen && (
                    <DeleteUserModal
                        onSubmit={handleDeleteUser}
                        isOpen={isDeleteModalOpen}
                        isDeleteLoading={isDeleteLoading}
                        user={selectedUser}
                        onClose={() => setDeleteModalOpen(false)}
                    />
                )}
            </div>
        </Layout>
    )
}

export default Users
