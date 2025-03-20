import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useGetRolesQuery } from "../../../redux/apis/rolesSlice";


interface EditUserModalProps {
    isEditUserLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
    user: any | null;
    onSubmit: (id: string, values: { name: string; role: string }, onSuccess: () => void) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isEditUserLoading, isOpen, onClose, user, onSubmit }) => {
    if (!isOpen || !user) return null;

    // Fetch roles from API
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: rolesData, isLoading: isRolesLoading } = useGetRolesQuery({}, { skip: !isOpen });

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        role: Yup.string().required("Role is required"),
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Edit User</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ name: user.name, role: user.role?._id || "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(user?._id, values, onClose)}
                >
                    {() => (
                        <Form autoComplete="off" className="space-y-4 mt-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-gray-300">Name</label>
                                <Field name="name" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Role Select Dropdown */}
                            <div>
                                <label className="block text-gray-300">Role</label>
                                <Field as="select" name="role" className="w-full p-2 rounded bg-gray-800 text-white">
                                    <option value="" disabled>
                                        {isRolesLoading ? "Loading roles..." : "Select a role"}
                                    </option>
                                    {rolesData?.data?.map((role: { _id: string, name: string }) => (
                                        <option key={role._id} value={role._id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isEditUserLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                                    {isEditUserLoading ? "Updating..." : "Update User"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditUserModal;
