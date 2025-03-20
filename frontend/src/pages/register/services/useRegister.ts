import { useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "../../../redux/apis/authSlice";
import { toast } from "react-toastify";

export const useRegister = () => {
    const navigate = useNavigate();
    const [postRegister, { isLoading }] = usePostRegisterMutation();

    const register = async (values: { name: string; email: string; password: string }) => {
        try {
            console.log("Registering user:", values);
            const response = await postRegister(values).unwrap();

            const { token, user } = response.data;

            // Store token and user info in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Show success toast
            toast.success(response?.message || "Registration successful!");
            navigate("/dashboard");
            return { token, user };
        } catch (error: any) {
            // Show error toast
            toast.error(error.data?.message || "Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return { register, isLoading };
};
