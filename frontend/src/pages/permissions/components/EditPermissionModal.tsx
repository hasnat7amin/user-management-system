import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

interface EditPermissionModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (id: string, values: { name: string; description: string }, onSuccess: () => void) => Promise<void>;
    permission: { _id: string; name: string; description: string } | null;
}

const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, isLoading, onClose, onSubmit, permission }) => {
    if (!isOpen || !permission) return null;

    const validationSchema = Yup.object({
        name: Yup.string().required("Permission name is required"),
        description: Yup.string().required("Description is required"),
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Edit Permission</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Form */}
                <Formik
                    initialValues={{ name: permission.name, description: permission.description }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(permission?._id, values, onClose)}
                >
                    {() => (
                        <Form autoComplete="off" className="space-y-4 mt-4">
                            {/* Permission Name */}
                            <div>
                                <label className="block text-gray-300">Permission Name</label>
                                <Field name="name" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-300">Description</label>
                                <Field as="textarea" name="description" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                                    {isLoading ? "Updating..." : "Update Permission"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditPermissionModal;
