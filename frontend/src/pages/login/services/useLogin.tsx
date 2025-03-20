import { useState } from "react";
import { usePostLoginMutation } from "../../../redux/apis/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const [postLogin, { isLoading }] = usePostLoginMutation();
    const login = async (values: { email: string; password: string }) => {
        try {
            console.log("Logging in with:", values);
            const response = await postLogin(values).unwrap();

            const { token, user } = response.data;

            // Store token and user info in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // Store user details

            // Show success toast
            toast.success(response?.message || "Login successful!");
            navigate("/dashboard");
            return { token, user };
        } catch (error: any) {
            // Show error toast
            toast.error(error.data?.message || "Login failed. Please try again.");
            console.error("Login error:", error);
        }
    };


    return { login, isLoading };
};
