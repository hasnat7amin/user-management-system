import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "../services/useLogin";

const LoginForm = () => {
  const { login, isLoading } = useLogin();

  // Form Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-white text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-white">Email</label>
                <Field name="email" type="email" className="w-full p-2 rounded bg-gray-700 text-white" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white">Password</label>
                <Field name="password" type="password" className="w-full p-2 rounded bg-gray-700 text-white" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-gray-900 py-2 rounded hover:bg-gray-300 transition"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
