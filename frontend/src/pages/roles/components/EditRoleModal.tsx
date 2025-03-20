import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useGetPermissionsQuery } from "../../../redux/apis/permissionsSlice";

interface EditRoleModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    role: { _id: string; name: string; permissions: { _id: string; name: string }[] } | null;
    onSubmit: (id: string, values: { name: string; permissions: string[] }, onSuccess: () => void) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen, isLoading, onClose, role, onSubmit }) => {
    if (!isOpen || !role) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: permissionsData, isLoading: isPermissionsLoading } = useGetPermissionsQuery({}, { skip: !isOpen });
    const permissions = permissionsData?.data || [];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        role.permissions.map((perm) => perm._id)
    );

    const handlePermissionToggle = (permissionId: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId]
        );
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Role name is required"),
        permissions: Yup.array().min(1, "At least one permission is required"),
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Edit Role</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ name: role.name, permissions: selectedPermissions }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(role._id, { ...values, permissions: selectedPermissions }, onClose)}
                >
                    {() => (
                        <Form autoComplete="off" className="space-y-4 mt-4">
                            {/* Role Name */}
                            <div>
                                <label className="block text-gray-300">Role Name</label>
                                <Field name="name" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Permissions Selection */}
                            <div>
                                <label className="block text-gray-300">Permissions</label>
                                {isPermissionsLoading ? (
                                    <p className="text-gray-400">Loading permissions...</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {permissions.map((permission: any) => (
                                            <span
                                                key={permission._id}
                                                onClick={() => handlePermissionToggle(permission._id)}
                                                className={`px-3 py-1 cursor-pointer rounded-full text-sm ${selectedPermissions.includes(permission._id)
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-700 text-gray-300"
                                                    }`}
                                            >
                                                {permission.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="permissions" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                                    {isLoading ? "Updating..." : "Update Role"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
};

export default EditRoleModal;
