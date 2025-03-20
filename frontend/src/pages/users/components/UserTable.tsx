
import { Icon } from "@iconify/react";
import { useGetUsersQuery } from "../../../redux/apis/userSlice";
import { isPermitted } from "../../../helpers/isPermitted";

const UserTable = ({ onView, onEdit, onDelete, userProfileData }: any) => {
    const { data, isLoading, isError } = useGetUsersQuery({});
    
    if (isLoading) return <p className="text-white">Loading users...</p>;
    if (isError) return <p className="text-red-500">Failed to load users.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-white border-collapse border border-gray-600">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-600 p-3">Name</th>
                        <th className="border border-gray-600 p-3">Email</th>
                        <th className="border border-gray-600 p-3">Role</th>
                        <th className="border border-gray-600 p-3">Created At</th>
                        <th className="border border-gray-600 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((user: any) => (
                        <tr key={user._id} className="bg-gray-700 hover:bg-gray-600">
                            <td className="border border-gray-600 p-3">{user.name}</td>
                            <td className="border border-gray-600 p-3">{user.email}</td>
                            <td className="border border-gray-600 p-3">{user.role.name}</td>
                            <td className="border border-gray-600 p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="border border-gray-600 p-3 flex gap-3 justify-center">
                                {isPermitted(userProfileData, "VIEW_USERS") && <Icon
                                    icon="mdi:eye"
                                    className="text-blue-400 cursor-pointer"
                                    width={20}
                                    height={20}
                                    onClick={() => onView(user)}
                                />}
                                {isPermitted(userProfileData, "UPDATE_USERS") && (<Icon
                                    icon="mdi:pencil"
                                    className="text-yellow-400 cursor-pointer"
                                    width={20}
                                    height={20}
                                    onClick={() => onEdit(user)}
                                />)}
                                {isPermitted(userProfileData, "DELETE_USERS") && < Icon
                                    icon="mdi:trash-can"
                                    className="text-red-400 cursor-pointer"
                                    width={20}
                                    height={20}
                                    onClick={() => onDelete(user)}
                                />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
