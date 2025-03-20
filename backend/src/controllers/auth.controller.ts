import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/response";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body; 
        const { user, token } = await registerUser(name, email, password);
        successResponse(res, { user, token }, "User registered successfully", 201);
    } catch (error: any) {
        errorResponse(res, error.message, 400);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);

        successResponse(res, { user, token }, "User logged in successfully");
    } catch (error: any) {
        errorResponse(res, error.message, 400);
    }
};
