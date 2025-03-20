import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

interface AddUserModalProps {
    isAddUserLoading: boolean,
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: { name: string; email: string; password: string }, onSuccess: () => void) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isAddUserLoading, isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold">Add New User</h2>
                    <button onClick={onClose}>
                        <Icon icon="ic:round-close" className="text-2xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onSubmit(values, onClose)}
                >
                    {({ isSubmitting }) => (
                        <Form autoComplete="off" className="space-y-4 mt-4">
                            <div>
                                <label className="block text-gray-300">Name</label>
                                <Field name="name" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label className="block text-gray-300">Email</label>
                                <Field autoComplete="off" name="email" type="email" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label className="block text-gray-300">Password</label>
                                <Field autoComplete="off" name="password" type="password" className="w-full p-2 rounded bg-gray-800 text-white" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isAddUserLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                                    {isAddUserLoading ? "Adding..." : "Add User"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
};

export default AddUserModal;
